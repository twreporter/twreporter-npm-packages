import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'
import styles from '../../constants/css'
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

const Container = styled.div`
  ${styles.paragraphText}
  ${styles.linkChildren}
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
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
  color: ${props => props.theme.colors.primary.text};
`

const Indicator = styled.span`
  /* circle */
  margin-left: 3px;
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.primary.text};
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
    background: ${props => props.theme.colors.primary.text};
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
    background: ${props => props.theme.colors.primary.text};
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
  border-top: 2px solid ${props => props.theme.colors.primary.support};
  padding: 25px 11px;
  margin-bottom: 10px;
  animation: ${slideDownAndFadeIn} 300ms ease;
`

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
