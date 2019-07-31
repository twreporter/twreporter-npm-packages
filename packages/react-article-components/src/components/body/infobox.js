import mq from '@twreporter/core/lib/utils/media-query'
import PropTypes from 'prop-types'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import cssConsts from '../../constants/css'
import styled, { css } from 'styled-components'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const widthCSS = css`
  ${mq.mobileOnly`
    width: calc(248/300*100%);
  `}

  ${mq.tabletOnly`
    width: 445px;
  `}

  ${mq.desktopOnly`
    width: 480px;
  `}

  ${mq.hdOnly`
    width: 580px;
  `}
`

const Title = styled.div`
  ${widthCSS}
  color: #494949;
  line-height: 1.9;
  letter-spacing: 0.7px;
  font-weight: ${typography.font.weight.bold};
  font-size: ${props => props.theme.fontSizeOffset + 20}px;
  margin: 0 auto 21px auto;
`

const Content = styled.div`
  ${widthCSS}

  color: #494949;
  line-height: 1.75;
  letter-spacing: 0.5px;
  font-weight: ${typography.font.weight.normal};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  margin: 0 auto;
`

const Container = styled.div`
  ${cssConsts.linkChildren}

  background: #fff;
  position: relative;
  margin: 60px auto 0 auto;
  ${mq.tabletAndBelow`
    padding-top: 30px;
    padding-bottom: 30px;
  `}
  ${mq.desktopAndAbove`
    padding-top: 40px;
    padding-bottom: 40px;
  `}
  &::before {
    /* sides of the triangle: 58 48 33 */
    content: '';
    display: block;
    width: 58px;
    height: 1px;
    transform: rotate(34.51deg);
    transform-origin: right center;
    position: absolute;
    right: -15px;
    top: 28px;
    background: ${props => props.theme.colors.primary.support};
  }
  &::after {
    /*
      sides of the triangle: 58 48 33 (px)
      translate hori: -6, verti: 11 (px)
    */
    content: '';
    display: block;
    width: 58px;
    height: 1px;
    transform: rotate(34.51deg);
    transform-origin: left center;
    position: absolute;
    left: -6px;
    bottom: 22px;
    background: ${props => props.theme.colors.primary.support};
  }
`

export default class Infobox extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, data } = this.props
    const contentHtmlString = _.get(data, ['content', 0, 'body'], '')
    const title = _.get(data, ['content', 0, 'title'], '')
    return contentHtmlString ? (
      <Container className={className}>
        {title ? <Title>{title}</Title> : null}
        <Content dangerouslySetInnerHTML={{ __html: contentHtmlString }} />
      </Container>
    ) : null
  }
}
