import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import {
  READING_TIME_UNIT,
  READING_TIME_UNIT_TEXT,
} from '@twreporter/core/lib/constants/reading-time-unit'

import { P1, P2, P3 } from '../text/paragraph'

const CardBgColor = {
  [MEMBER_ROLE.explorer]: colorGrayscale.white,
  [MEMBER_ROLE.action_taker]: colorGrayscale.gray200,
  [MEMBER_ROLE.trailblazer]: colorGrayscale.gray900,
}

const CardP2TextColor = {
  [MEMBER_ROLE.explorer]: colorGrayscale.gray700,
  [MEMBER_ROLE.action_taker]: colorGrayscale.gray700,
  [MEMBER_ROLE.trailblazer]: colorGrayscale.gray200,
}

const CardP1TextColor = {
  [MEMBER_ROLE.explorer]: colorGrayscale.gray800,
  [MEMBER_ROLE.action_taker]: colorGrayscale.gray800,
  [MEMBER_ROLE.trailblazer]: colorGrayscale.white,
}

const CardMarkStyle = {
  [MEMBER_ROLE.explorer]: {
    width: '214px',
    height: '343px',
  },
  [MEMBER_ROLE.action_taker]: {
    width: '208px',
    height: '307px',
  },
  [MEMBER_ROLE.trailblazer]: {
    width: '219px',
    height: '328px',
  },
}

const CardContainer = styled.div`
  max-width: 320px;
  min-width: 296px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05),
    inset 2px 2px 4px rgba(255, 255, 255, 0.5),
    inset -2px -2px 2px rgba(0, 0, 0, 0.15);
  aspect-ratio: 1/1.6;
  background-color: ${props => props.bgColor};
  padding: 24px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
  display: flex;
  flex-direction: row;
  position: relative;
`

const LeftColumn = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RightColumn = styled.div`
  width: 42px;
`

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
`

const LogoImg = styled.img`
  width: 16px;
  height: 17px;
`

const MarkContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const MarkImgs = styled.img`
  width: ${props => CardMarkStyle[props.role].width};
  height: ${props => CardMarkStyle[props.role].height};
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TitleImg = styled.img`
  width: 100%;
`

const P3Gray500 = styled(P3)`
  color: ${colorGrayscale.gray500};
`

const Gray500BottomLine = styled.div`
  border-bottom: 0.5px solid;
  border-color: ${colorGrayscale.gray500};
  flex: 1;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 4.5px;
`

const P2TextContainer = styled.div`
  color: ${props => props.color};
  overflow-wrap: anywhere;
`

const StyledP1 = styled(P1)`
  color: ${props => props.color};
  line-height: 125%;
  letter-spacing: 10%;
`

const MobileMemberRoleCard = ({
  role = MEMBER_ROLE.explorer,
  releaseBranch = BRANCH.master,
  email = '',
  joinDate = '',
  name = '',
  articleReadCount = 0,
  articleReadingTimeUnit = READING_TIME_UNIT.minute,
  articleReadingTime = 0,
  hideInfo = false,
}) => {
  const logoUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_logo.png`
  const titleUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_title.svg`
  const markUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_mark.png`

  return (
    <CardContainer bgColor={CardBgColor[role]}>
      <MarkContainer>
        <MarkImgs role={role} src={markUrl} />
      </MarkContainer>
      <LeftColumn>
        <P2TextContainer color={CardP2TextColor[role]}>
          {role !== MEMBER_ROLE.explorer && <P2 text={name} />}
          <P2 text={email} />
        </P2TextContainer>
        <InfoContainer>
          {!hideInfo && (
            <>
              <TextContainer>
                <P3Gray500 text={'閱讀篇數'} />
                <Gray500BottomLine />
                <StyledP1
                  color={CardP1TextColor[role]}
                  weight={P1.Weight.BOLD}
                  text={articleReadCount.toLocaleString('en-US')}
                />
              </TextContainer>
              <TextContainer>
                <P3Gray500
                  text={`閱讀${READING_TIME_UNIT_TEXT[articleReadingTimeUnit]}`}
                />
                <Gray500BottomLine />
                <StyledP1
                  color={CardP1TextColor[role]}
                  weight={P1.Weight.BOLD}
                  text={
                    articleReadingTime > 99999
                      ? '99,999+'
                      : articleReadingTime.toLocaleString('en-US')
                  }
                />
              </TextContainer>
            </>
          )}
          <TextContainer>
            <P3Gray500 text={'加入日期'} />
            <Gray500BottomLine />
            <StyledP1
              color={CardP1TextColor[role]}
              weight={P1.Weight.BOLD}
              text={joinDate}
            />
          </TextContainer>
        </InfoContainer>
      </LeftColumn>
      <RightColumn>
        <TitleContainer>
          <TitleImg src={titleUrl} />
          <LogoContainer>
            <LogoImg src={logoUrl} />
          </LogoContainer>
        </TitleContainer>
      </RightColumn>
    </CardContainer>
  )
}

MobileMemberRoleCard.propTypes = {
  role: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  releaseBranch: BRANCH_PROP_TYPES,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
  articleReadCount: PropTypes.number,
  articleReadingTimeUnit: PropTypes.oneOf(Object.values(READING_TIME_UNIT)),
  articleReadingTime: PropTypes.number,
  hideInfo: PropTypes.bool,
}

export default MobileMemberRoleCard
