import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
// components
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
  max-width: ${(props) => props.$maxWidth};
`

const TextContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${colorGrayscale.gray800};
`

const ButtonContainer = styled.a`
  margin-top: 24px;
  text-decoration: none;
`

const GuideContainer = styled.div`
  display: flex;
  align-items: baseline;
  text-align: center;
  color: ${colorGrayscale.gray600};
  svg {
    background-color: ${colorGrayscale.gray600};
    width: 18px;
    height: 18px;
    margin: 0 4px;
    transform: translateY(3px);
  }
`
const defaultFunc = () => {}
const EmptyState = ({
  releaseBranch = BRANCH.master,
  style = Style.DEFAULT,
  title = '',
  showGuide = true,
  guide = null,
  showButton = true,
  buttonText = '',
  buttonUrl = '/',
  buttonOnclick = defaultFunc,
  maxWidth = '280px',
}) => {
  let imageUrl = ''
  let imageWidth = ''

  switch (style) {
    case Style.DEFAULT:
    default:
      imageUrl = `https://www.twreporter.org/assets/empty-state/${releaseBranch}/seek.png`
      imageWidth = '170'
      break
    case Style.PENCIL:
      imageUrl = `https://www.twreporter.org/assets/empty-state/${releaseBranch}/pencil.png`
      imageWidth = '232'
      break
    case Style.UNDER_CONSTRUCTION:
      imageUrl = `https://www.twreporter.org/assets/empty-state/${releaseBranch}/under_construction.png`
      imageWidth = '177'
      break
  }
  return (
    <OuterContainer>
      <Container $maxWidth={maxWidth}>
        <img src={imageUrl} width={imageWidth} />
        <TextContainer>
          <P1 text={title} weight={P1.Weight.BOLD} />
          {showGuide && (
            <GuideContainer>
              {typeof guide === 'string' ? <P2 text={guide} /> : guide}
            </GuideContainer>
          )}
        </TextContainer>
        {showButton && (
          <ButtonContainer href={buttonUrl} onClick={buttonOnclick}>
            <PillButton text={buttonText} size={Size.L} />
          </ButtonContainer>
        )}
      </Container>
    </OuterContainer>
  )
}
EmptyState.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  style: PropTypes.oneOf(Object.values(Style)),
  title: PropTypes.string,
  showGuide: PropTypes.bool,
  guide: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  showButton: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonUrl: PropTypes.string,
  buttonOnclick: PropTypes.func,
  maxWidth: PropTypes.string,
}

EmptyState.Style = Style

export default EmptyState
