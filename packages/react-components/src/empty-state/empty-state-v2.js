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
import { Style } from './enums'

const Container = styled.div`
  width: 100%;
  max-width: ${(props) => props.$maxWidth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TextContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${colorGrayscale.gray800};
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

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EmptyState = ({
  releaseBranch = BRANCH.master,
  style = Style.DEFAULT,
  maxWidth = '280px',
  title = '',
  guide = null,
  buttonComponents = [],
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
    <Container $maxWidth={maxWidth}>
      <img src={imageUrl} width={imageWidth} />
      <TextContainer>
        <P1 text={title} weight={P1.Weight.BOLD} />
        {guide ? (
          <GuideContainer>
            {typeof guide === 'string' ? <P2 text={guide} /> : guide}
          </GuideContainer>
        ) : null}
      </TextContainer>
      {buttonComponents.length > 0 ? (
        <ButtonContainer>
          {buttonComponents.map((button, index) => (
            <React.Fragment key={index}>{button}</React.Fragment>
          ))}
        </ButtonContainer>
      ) : null}
    </Container>
  )
}
EmptyState.propTypes = {
  releaseBranch: BRANCH_PROP_TYPES,
  style: PropTypes.oneOf(Object.values(Style)),
  title: PropTypes.string,
  maxWidth: PropTypes.string,
  guide: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  buttonComponents: PropTypes.arrayOf(PropTypes.element),
}

EmptyState.Style = Style

export default EmptyState
