# Table of Contents(toc)

## Usage

```
import React from 'react'

// styled components of table of contents for layout
import Styled from './styled'
import TOC from '@twreporter/react-components/lib/table-of-contents'

class StyledTableOfContents extends React.Component {
  render() {
    const { manager } = this.props

    return (
      <TOC.React.TableOfContents
        manager={manager}
        render={(anchors, highlightAnchor, handleAnchorClick) => {
          const anchorsJSX = _.map(anchors, anchor => {
            const toHighlight = anchor === highlightAnchor

            return (
              <Styled.TOCRow
                key={anchor.anchorID}
              >
                <Styled.TOCIndicator
                  toHighlight={toHighlight}
                />
                <Styled.TOCText toHighlight={toHighlight}>
                  {anchor.anchorLable}
                </Styled.TOCText>
              </Styled.TOCRow>
            )
          })

          return (
            <React.Fragment>
              <Styled.TOCTab>
                <div>索引</div>
              </Styled.TOCTab>
              <Styled.TOCBlock>{anchorsJSX}</Styled.TOCBlock>
            </React.Fragment>
          )
        }}
      />
    )
  }
}

class Body extends React.Component {
  static defaultProps = {
    content: [],
  }

  render() {
    const { content } = this.props
    const tocManager = new TOC.Manager()
    const contentJsx = Array.isArray(content)
      ? _.map(content, (data, index) => {
          const elementJSX = this.renderElement(data, index)
          if (data.type === 'header-one') {
            return (
              <TOC.React.Anchor
                key={data.id}
                id={data.id}
                label={_.get(data, 'content.0')}
                manager={tocManager}
              >
                {elementJSX}
              </TOC.React.Anchor>
            )
          }
          return elementJSX
        })
      : null
    return (
      <div>
        {contentJsx}
        <StyledTableOfContents manager={tocManager} />
      </div>
    )
  }
}
```
