import React from 'react'
import styled from 'styled-components'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import requestOrigin from '@twreporter/core/lib/constants/request-origins'
// components
import BookmarkIcon from './assets/bookmark-add.svg'
import { P1, P2 } from '../text/paragraph'
import { PillButton } from '../button'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
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
  align-items: flex-end;
  color: ${colorGrayscale.gray600};
  img {
    width: 18px;
    height: 16px;
    margin: 0 4px;
    padding-bottom: 4px;
  }
`

const EmptyGuide = ({ releaseBranch = releaseBranchConsts.master }) => {
  const homepageUrl = requestOrigin.forClientSideRendering[releaseBranch].main
  const seekImageUrl = `https://www.twreporter.org/assets/bookmark/${releaseBranch}/seek.png`
  return (
    <Container>
      <img alt="Seek Bookmark" src={seekImageUrl} width="170" />
      <TextContainer>
        <P1 text="你還沒有儲存任何文章！" weight="bold" />
        <GuideContainer>
          <P2 text="點擊" />
          <img src={BookmarkIcon} alt="Add Bookmark" />
          <P2 text="將喜愛的文章加入我的書籤" />
        </GuideContainer>
      </TextContainer>
      <ButtonContainer href={homepageUrl}>
        <PillButton text="開始探索" size="L" releaseBranch={releaseBranch} />
      </ButtonContainer>
    </Container>
  )
}
EmptyGuide.propTypes = {
  releaseBranch: predefinedPropTypes.releaseBranch,
}

export default EmptyGuide
