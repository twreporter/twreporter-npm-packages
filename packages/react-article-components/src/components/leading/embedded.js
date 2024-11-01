import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useHistory } from 'react-router-dom'
// @twreporter
import { H1, H5 } from '@twreporter/react-components/lib/text/headline'
import { P2 } from '@twreporter/react-components/lib/text/paragraph'
import {
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'
import mq from '@twreporter/core/lib/utils/media-query'
// constants
import predefinePropTypes from '../../constants/prop-types/leading'
// component
import EmbeddedCodeComponent from '../body/embedded-code'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const EmbeddedBlock = styled.div`
  max-width: 100%;
  max-height: 100%;
`

const ContentBlock = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
  justify-content: space-between;

  ${mq.hdOnly`
    width: 1280px;
    margin: 16px auto 0px;
  `}
  ${mq.desktopOnly`
    padding: 0 48px;
  `}
  ${mq.tabletAndBelow`
    flex-direction: column;
    width: 66.7%;
    margin: 16px auto 0px;
    `}
  ${mq.mobileOnly`
    width: 100%;
    padding: 0 24px;
  `}
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  order: 1;

  ${mq.hdOnly`
    width: 940px;
  `}
  ${mq.desktopOnly`
    width:calc(740px + (50% - 550px));
  `}
  ${mq.tabletAndBelow`
    order: 2;
  `}
`

const CaptionBlock = styled.div`
  order: 2;

  ${mq.hdOnly`
    width: 265px;
  `}
  ${mq.desktopOnly`
    width: 180px;
  `}
  ${mq.tabletAndBelow`
    order: 1;
    margin-bottom: 32px;
  `}
`

const Caption = styled(P2)`
  color: ${colorGrayscale.gray600};
`

const Title = styled(H1)`
  color: ${colorGrayscale.gray800};
`

const SubTitle = styled(H5)`
  color: ${colorGrayscale.gray800};
`

const TopicTitle = styled.div`
  padding: 8px 10px;
  color: ${colorSupportive.heavy};
  border: 1px solid ${colorSupportive.main};
  width: fit-content;
  cursor: pointer;
`

const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`

const Loader = styled.span`
  width: 32px;
  height: 32px;
  border: 2px solid ${colorGrayscale.gray400};
  border-top-color: ${colorGrayscale.gray600};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
`

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Embedded = ({
  title,
  subtitle,
  topicHref,
  shortTitle,
  isTopicPublished,
  embedded,
}) => {
  const navigate = useHistory()
  const [captionText, setCaptionText] = useState('')
  const [embeddedCode, setEmbeddedCode] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const onTopicClick = () => {
    navigate.push(topicHref)
  }

  const handleIsLoaded = () => {
    // add timeout before hidding loading to prevent flashing
    window.setTimeout(() => setIsLoading(false), 500)
  }

  useEffect(() => {
    if (embedded.length > 0) {
      _.map(embedded, (code) => {
        switch (code.type) {
          case 'embedded-code':
          case 'embeddedCode':
          case 'embeddedcode':
            const { content } = code
            if (content.length > 0) {
              const { caption } = content[0]
              if (caption) {
                setCaptionText(caption)
              }
              setEmbeddedCode(code)
            }
            break
        }
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('load', handleIsLoaded, true)
    return () => window.removeEventListener('load', handleIsLoaded, true)
  }, [])

  return (
    <div>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : null}
      {embeddedCode ? (
        <EmbeddedBlock>
          {/* caption will be render at this componet, not child component */}
          <EmbeddedCodeComponent
            data={embeddedCode}
            showCaption={!captionText}
          />
        </EmbeddedBlock>
      ) : null}
      <ContentBlock>
        <TitleBlock>
          {isTopicPublished && shortTitle ? (
            <TopicTitle onClick={onTopicClick}>
              <P2 text={shortTitle} weight={P2.Weight.BOLD} />
            </TopicTitle>
          ) : null}
          {subtitle && <SubTitle text={subtitle} />}
          <Title text={title} type={H1.Type.ARTICLE} />
        </TitleBlock>
        {captionText ? (
          <CaptionBlock>
            <Caption text={captionText} />
          </CaptionBlock>
        ) : null}
      </ContentBlock>
    </div>
  )
}

Embedded.propTypes = {
  ...predefinePropTypes.embedded,
}

export default Embedded
