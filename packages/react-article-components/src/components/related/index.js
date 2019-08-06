import List from './list'
import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '@twreporter/core/lib/utils/media-query'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import typography from '../../constants/typography'

const _ = {
  debounce,
  get,
  map,
  sortBy,
}

const _articleStyles = {
  interactive: 'interactive',
}

const Block = styled.section`
  ${mq.desktopAndAbove`
    display: flex;
  `}

  ${mq.desktopOnly`
    margin-left: 28px;
  `}

  ${mq.hdOnly`
    margin-left: 53px;
  `}
`

const Descriptor = styled.div`

  ${mq.tabletAndBelow`
    margin: 0 auto 40px auto;
    color: ${props => props.theme.colors.base.lightText};
    font-size: 20px;
    font-weigth: ${typography.font.weight.bold};

    &:before {
      content: '相關文章';
    }
  `}

  ${mq.mobileOnly`
    width: calc(309/355*100%);
  `}

  ${mq.tabletOnly`
    width: 513px;
  `}

  ${mq.desktopAndAbove`
    flex-shrink: 0;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: 0.4px;
    color: #494949;
    margin-right: auto;
    padding-top: 5px;
    border-top: solid 0.5px #d8d8d8;
    position: relative;

    &:before {
      content: '相關文章';
      margin-left: 5px;
      margin-top: 5px;
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 12px;
      border-right: solid 0.5px #d8d8d8;
    }
  `}

  ${mq.desktopOnly`
    width: 180px;
    margin-right: 15px;
  `}

  ${mq.hdOnly`
    width: 250px;
    margin-right: 12px;
  `}
`

const screen = {
  mobile: 768,
  destkop: 1024,
  hd: 1440,
}

export default class Related extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)

    this.state = {
      lastWindowWidth: 0,
    }

    this.handleWindowResize = _.debounce(this._handleWindowResize, 500).bind(
      this
    )
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  _handleWindowResize = () => {
    const curWindowWidth = window.innerWidth
    let lastWindowWidth

    // The following conditions are set for performance.
    // Since we only have three different device layout,
    // including mobile, desktop and hd,
    // we are not going to re-render `List` component
    // unless the resize events cause the layout change.
    if (curWindowWidth < screen.destkop) {
      lastWindowWidth = screen.mobile
    } else if (curWindowWidth < screen.hd) {
      lastWindowWidth = screen.destkop
    } else {
      lastWindowWidth = screen.hd
    }

    this.setState({
      lastWindowWidth,
    })
  }

  render() {
    const { data } = this.props
    const { lastWindowWidth } = this.state

    const relateds = _.map(data, related => {
      const style = _.get(related, 'style')
      const prefixPath = style === _articleStyles.interactive ? '/i/' : '/a/'
      const categories = related.categories
      // sort categories in ascending order
      _.sortBy(categories, ['sort_order'])

      // use og_image first
      const imageSet = _.get(related, 'og_image.resized_targets', {})
      // use `w400` image set first
      // if `w400` is not provided, then use `mobile` image set
      const thumbnail = _.get(imageSet, 'w400.url')
        ? imageSet.w400
        : imageSet.mobile

      return {
        category: _.get(categories, '0.name', ''),
        publishedDate: related.published_date,
        desc: related.og_description,
        href: prefixPath + related.slug,
        id: related.id,
        isTargetBlank: style === _articleStyles.interactive,
        // if `og_image` is not provided,
        // use `hero_image` as fallback
        thumbnail: _.get(thumbnail, 'url')
          ? thumbnail
          : _.get(related, 'hero_image.resized_targets.mobile'),
        title: related.title,
      }
    })

    return (
      <Block>
        <Descriptor />
        <List key={`list-width-${lastWindowWidth}`} data={relateds} />
      </Block>
    )
  }
}
