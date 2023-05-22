import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
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

const RelaticeDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const LogoImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`

const TitleImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`

const MarkImg = styled.img`
  position: absolute;
  left: 0;
  top: ${props => props.top}px;
  transform: translateY(${props => props.translateY});
`

const DataContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`
const TextContainer = styled.div`
  color: ${props => props.color};
  padding-bottom: ${props => props.paddingBottom || 0}px;
`

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}

const MobileMemberRoleCard = ({
  role = MEMBER_ROLE.explorer,
  releaseBranch = BRANCH.master,
  email = '',
  joinDate = '',
  name = '',
}) => {
  const [width] = useWindowSize()
  const [logoHeight, setLogoHeight] = useState(0)
  const [dataContainerDistanceToTop, setDataContainerDistanceToTop] = useState(
    0
  )
  const [markContainerTop, setMarkContainerTop] = useState(0)
  const [markContainerTranslateY, setMarkContainerTranslateY] = useState('')

  const logoContainerRef = useRef()
  const dataContainerRef = useRef()

  useEffect(() => {
    if (dataContainerRef.current) {
      setDataContainerDistanceToTop(dataContainerRef.current.offsetTop)
    }
    if (logoContainerRef.current) {
      setLogoHeight(logoContainerRef.current.offsetHeight)
    }
  }, [width, role])

  useEffect(() => {
    setMarkContainerTop(
      Math.round((dataContainerDistanceToTop - logoHeight) / 2)
    )
    setMarkContainerTranslateY(`calc((-50% + ${logoHeight}px))`)
  }, [logoHeight, dataContainerDistanceToTop])

  const logoUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_logo.png`
  const titleUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_title.png`
  const markUrl = `https://www.twreporter.org/assets/user-role-card/${releaseBranch}/${role}_mark.png`

  return (
    <CardContainer bgColor={CardBgColor[role]}>
      <RelaticeDiv>
        <LogoImg ref={logoContainerRef} src={logoUrl} />
        <TitleImg src={titleUrl} />
        <MarkImg
          top={markContainerTop}
          src={markUrl}
          translateY={markContainerTranslateY}
        />
        <DataContainer ref={dataContainerRef}>
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
      </RelaticeDiv>
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
