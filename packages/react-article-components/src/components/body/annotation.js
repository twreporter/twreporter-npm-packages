import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { css, keyframes } from 'styled-components'
import styles from '../../constants/css'
import themeConst from '../../constants/theme'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const slideDownAndFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-1.2em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const AnnotationContainer = styled.abbr`
  &[title] {
    margin: 0;
    text-decoration: none;
    border-bottom: 0;
  }
`

const AnnotatedText = styled.span`
  cursor: pointer;
`

const Indicator = styled.span`
  /* circle */
  margin-left: 3px;
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  position: relative;
  top: -1px;
  /* arrow */
  &::after {
    content: '';
    width: 2px;
    height: 6.5px;
    top: 5px;
    left: 5px;
    transform: rotate(${props => (props.isExpanded ? '45deg' : '-45deg')});
    display: block;
    position: absolute;
    transition: transform 200ms ease;
  }
  &::before {
    content: '';
    width: 2px;
    height: 6.5px;
    top: 5px;
    right: 5px;
    transform: rotate(${props => (props.isExpanded ? '-45deg' : '45deg')});
    display: block;
    position: absolute;
    transition: transform 200ms ease;
  }
`

const AnnotationContent = styled.div`
  display: ${props => (props.isExpanded ? 'block' : 'none')};
  background: #fff;
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  line-height: 2.11;
  letter-spacing: 0.5px;
  color: #494949;
  font-weight: ${typography.font.weight.normal};
  border-width: 2px 0 0 0;
  border-style: solid;
  padding: 25px 11px;
  margin-bottom: 10px;
  animation: ${slideDownAndFadeIn} 300ms ease;
`

const Container = styled.div`
  ${props => getContainerStyles(props.theme.name)}
  ${styles.paragraphText}
  ${styles.linkChildren}
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

function getContainerStyles(themeName) {
  switch (themeName) {
    case themeConst.article.v2.pink:
      return css`
        ${AnnotatedText} {
          color: #355ed3;
        }
        ${Indicator} {
          border-color: #355ed3;
          &::before,
          &::after {
            background-color: #355ed3;
          }
        }
        ${AnnotationContent} {
          border-color: #fbafef;
        }
      `
    case themeConst.article.v2.photo:
      return css`
        ${AnnotatedText} {
          color: #d0a67d;
        }
        ${Indicator} {
          border-color: #d0a67d;
          &::before,
          &::after {
            background-color: #d0a67d;
          }
        }
        ${AnnotationContent} {
          border-color: #d0a67d;
        }
      `
    case themeConst.article.v2.default:
    default:
      return css`
        ${AnnotatedText} {
          color: #a67a44;
        }
        ${Indicator} {
          border-color: #d0a67d;
          &::before,
          &::after {
            background-color: #d0a67d;
          }
        }
        ${AnnotationContent} {
          border-color: #d0a67d;
        }
      `
  }
}

class Annotation extends PureComponent {
  static propTypes = {
    annotation: PropTypes.string,
    pureAnnotationText: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    annotation: '',
    pureAnnotationText: '',
    text: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false,
    }
    this.toggleExpend = this._toggleExpend.bind(this)
  }

  _toggleExpend(e) {
    e.preventDefault()
    this.setState({
      isExpanded: !this.state.isExpanded,
    })
  }

  render() {
    const { annotation, pureAnnotationText, text } = this.props
    const { isExpanded } = this.state
    return (
      <AnnotationContainer title={pureAnnotationText}>
        <AnnotatedText onClick={this.toggleExpend}>
          {text}
          <Indicator isExpanded={isExpanded} />
        </AnnotatedText>
        <AnnotationContent
          dangerouslySetInnerHTML={{ __html: annotation }}
          isExpanded={isExpanded}
        />
      </AnnotationContainer>
    )
  }
}

class AnnotationParagraph extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    data: predefinedPropTypes.elementData,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, data } = this.props
    let html = _.get(data, ['content', 0])
    if (!html) return null
    // annotation data will be in the comment with prefix __ANNOTATION__=
    let re = /<!--__ANNOTATION__=(.+?)-->/
    const sections = []
    let result
    do {
      result = re.exec(html)
      if (result) {
        const fullStringMatched = result[0]
        const annotationJsonString = result[1]
        const textBeforeAnnotation = html.substring(0, result.index)
        try {
          const annotationObj = JSON.parse(annotationJsonString)
          const currentIndex = sections.length
          sections.push(
            <span
              key={currentIndex}
              dangerouslySetInnerHTML={{ __html: textBeforeAnnotation }}
            />,
            <Annotation key={'annotation ' + currentIndex} {...annotationObj} />
          )
          html = html.substr(result.index + fullStringMatched.length)
        } catch (e) {
          console.warn(
            'An error occured when parsing annotation object from content:',
            e,
            '\nThe annotation json string:',
            annotationJsonString
          ) // eslint-disable-line no-console
        }
      }
    } while (result)

    if (html) {
      sections.push(
        <span
          key={sections.length}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }

    return <Container className={className}>{sections}</Container>
  }
}

export default AnnotationParagraph
