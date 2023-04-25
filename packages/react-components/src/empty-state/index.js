import React from 'react'
import styled from 'styled-components'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
// components
import { Bookmark } from '../icon'
import { P1, P2 } from '../text/paragraph'
import { PillButton } from '../button'

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

const EmptyState = ({ releaseBranch = releaseBranchConsts.master }) => {
  const homepageUrl = requestOrigin.forClientSideRendering[releaseBranch].main
  const seekImageUrl = `https://www.twreporter.org/assets/bookmark/${releaseBranch}/seek.png`
  return (
    <OuterContainer>
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
    </OuterContainer>
  )
}
EmptyState.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export default EmptyState
