import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
// components
import { Bookmark } from '../icon'
import { P1, P2 } from '../text/paragraph'
import { PillButton } from '../button'
import { Style } from './enums'
import { Size } from '../shared-enum'

const OuterContainer = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 280px;
`

const TextContainer = styled.div`
  margin: 48px 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colorGrayscale.gray800};
`

const ButtonContainer = styled.a`
  text-decoration: none;
`

const GuideContainer = styled.div`
  display: flex;
  align-items: baseline;
  color: ${colorGrayscale.gray600};
  svg {
    background-color: ${colorGrayscale.gray600};
    width: 18px;
    height: 18px;
    margin: 0 4px;
    transform: translateY(3px);
  }
`

const getImageUrl = (style, releaseBranch) => {
  switch (style) {
    case Style.BOOKMARK:
      return `https://www.twreporter.org/assets/empty-state/${releaseBranch}/seek.png`
    case Style.PENCIL:
      return `https://www.twreporter.org/assets/empty-state/${releaseBranch}/pencil.png`
    case Style.UNDER_CONSTRUCTION:
      return `https://www.twreporter.org/assets/empty-state/${releaseBranch}/under_construction.png`
    default:
      return `https://www.twreporter.org/assets/empty-state/${releaseBranch}/seek.png`
  }
}

const BookMarkContainer = releaseBranch => {
  const homepageUrl = requestOrigin.forClientSideRendering[releaseBranch].main
  const seekImageUrl = getImageUrl(Style.BOOKMARK, releaseBranch)
  return (
    <Container>
      <img alt="Seek Bookmark" src={seekImageUrl} width="170" />
      <TextContainer>
        <P1 text="你還沒有儲存任何文章！" weight="bold" />
        <GuideContainer>
          <P2 text="點擊" />
          <Bookmark type="add" releaseBranch={releaseBranch} />
          <P2 text="將喜愛的文章加入我的書籤" />
        </GuideContainer>
      </TextContainer>
      <ButtonContainer href={homepageUrl}>
        <PillButton text="開始探索" size="L" />
      </ButtonContainer>
    </Container>
  )
}

const EmptyState = ({
  releaseBranch = BRANCH.master,
  style = Style.DEFAULT,
  title = '',
  showGuide = true,
  guide = '',
  showButton = true,
  buttonText = '',
  buttonUrl = '/',
}) => {
  return (
    <OuterContainer>
      {style === Style.BOOKMARK ? (
        BookMarkContainer(releaseBranch)
      ) : (
        <Container>
          <img src={getImageUrl(style, releaseBranch)} width="170" />
          <TextContainer>
            <P1 text={title} weight={P1.Weight.BOLD} />
            {showGuide && (
              <GuideContainer>
                <P2 text={guide} />
              </GuideContainer>
            )}
          </TextContainer>
          {showButton && (
            <ButtonContainer href={buttonUrl}>
              <PillButton text={buttonText} size={Size.L} />
            </ButtonContainer>
          )}
        </Container>
      )}
    </OuterContainer>
  )
}
EmptyState.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  style: PropTypes.oneOf(Object.values(Style)),
  title: PropTypes.string,
  showGuide: PropTypes.bool,
  guide: PropTypes.string,
  showButton: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
}

EmptyState.Style = Style

export default EmptyState
