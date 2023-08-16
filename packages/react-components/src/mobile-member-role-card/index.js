import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'

import { P1, P3 } from '../text/paragraph'

const CardBgColor = {
  [MEMBER_ROLE.explorer]: colorGrayscale.white,
  [MEMBER_ROLE.action_taker]: colorGrayscale.gray200,
  [MEMBER_ROLE.trailblazer]: colorGrayscale.gray900,
}

const CardTextColor = {
  [MEMBER_ROLE.explorer]: colorGrayscale.gray800,
  [MEMBER_ROLE.action_taker]: colorGrayscale.gray800,
  [MEMBER_ROLE.trailblazer]: colorGrayscale.white,
}

const CardMarkStyle = {
  [MEMBER_ROLE.explorer]: {
    width: '193px',
    height: '120px',
  },
  [MEMBER_ROLE.action_taker]: {
    width: '193px',
    height: '157px',
  },
  [MEMBER_ROLE.trailblazer]: {
    width: '166px',
    height: '196px',
  },
}

const CardContainer = styled.div`
  max-width: 320px;
  width: 100%;
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
`

const RelativeDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const LogoContainer = styled.div``

const LogoImg = styled.img`
  width: 16px;
  height: 17px;
`

const MarkContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: start;
  align-items: center;
`

const MarkImgs = styled.img`
  width: ${props => CardMarkStyle[props.role].width};
  height: ${props => CardMarkStyle[props.role].height};
`

const DataContainer = styled.div``

const TextContainer = styled.div`
  color: ${props => props.color};
  padding-bottom: ${props => props.paddingBottom || 0}px;
  overflow-wrap: anywhere;
`

const TitleImg = styled.img`
  position: relative;
  top: 0;
  right: 0;
  height: 100%;
`

const MobileMemberRoleCard = ({
  role = MEMBER_ROLE.explorer,
  releaseBranch = BRANCH.master,
  email = '',
  joinDate = '',
  name = '',
}) => {
  const logoUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_logo.png`
  const titleUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_title.png`
  const markUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_mark.png`

  return (
    <CardContainer bgColor={CardBgColor[role]}>
      <RelativeDiv>
        <FlexContainer>
          <LogoContainer>
            <LogoImg src={logoUrl} />
          </LogoContainer>
          <MarkContainer>
            <MarkImgs role={role} src={markUrl} />
          </MarkContainer>
          <DataContainer>
            {role !== MEMBER_ROLE.explorer && (
              <div>
                <TextContainer color={colorGrayscale.gray500}>
                  <P3 text={'姓名'}></P3>
                </TextContainer>
                <TextContainer color={CardTextColor[role]} paddingBottom={8}>
                  <P1 text={name}></P1>
                </TextContainer>
              </div>
            )}
            <TextContainer color={colorGrayscale.gray500}>
              <P3 text={'電子信箱'}></P3>
            </TextContainer>
            <TextContainer color={CardTextColor[role]} paddingBottom={8}>
              <P1 text={email}></P1>
            </TextContainer>
            <TextContainer color={colorGrayscale.gray500}>
              <P3 text={'加入日期'}></P3>
            </TextContainer>
            <TextContainer color={CardTextColor[role]}>
              <P1 text={joinDate}></P1>
            </TextContainer>
          </DataContainer>
        </FlexContainer>
        <TitleImg src={titleUrl} />
      </RelativeDiv>
    </CardContainer>
  )
}

MobileMemberRoleCard.propTypes = {
  role: PropTypes.oneOf(Object.values(MEMBER_ROLE)),
  releaseBranch: BRANCH_PROP_TYPES,
  email: PropTypes.string,
  joinDate: PropTypes.string,
  name: PropTypes.string,
}

export default MobileMemberRoleCard
