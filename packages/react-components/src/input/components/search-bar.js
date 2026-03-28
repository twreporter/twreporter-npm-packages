import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// utils
import { selectThemeStyle } from '../utils/theme'
// enums
import { WidthType } from '../enums'
// components
import { Cross, Search } from '../../icon'
import { IconButton } from '../../button'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'
import { THEME } from '@twreporter/core/lib/constants/theme'
// lodash
import get from 'lodash/get'
const _ = {
  get,
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 40px;
  background-color: ${(props) => props.$bgColor};
`
const Container = styled.form`
  display: flex;
  align-items: center;
  ${(props) => (props.$widthType === 'stretch' ? 'width: 100%;' : '')}
  ${InputContainer} {
    ${(props) =>
      props.$focus
        ? `
      background-color: ${props.$focusBgColor};
      border: 1px solid ${props.$borderColor};
    `
        : 'border: 1px solid transparent;'}
    &, & > input {
      ${(props) => (props.$widthType === 'stretch' ? 'width: 100%;' : '')}
    }
    ${mq.desktopAndAbove`
      ${(props) =>
        props.$focus
          ? `
        background-color: ${props.$desktopBgColor};
      `
          : ''}
    `}
  }
`
const Input = styled.input`
  color: ${(props) => props.$color};
  margin-right: 8px;
  height: 24px;
  font-size: 14px;
  &,
  &:focus,
  &:focus-visible {
    border: none;
    background-color: transparent;
    outline: none;
  }
  &:focus,
  &:focus-visible {
    &::placeholder {
      color: ${(props) => props.$focusColor};
    }
  }
  &::placeholder {
    color: ${(props) => props.$placeholderColor};
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
`
const DesktopOnlyIconButton = styled(IconButton)`
  margin-left: 8px;
  ${mq.tabletAndBelow`
    display: none;
  `}
`

const defaultFunc = () => {}
const SearchBar = ({
  placeholder = '',
  theme = THEME.normal,
  releaseBranch = BRANCH.master,
  onSearch = defaultFunc,
  onClose = defaultFunc,
  handleBlur = defaultFunc,
  autofocus = false,
  widthType = WidthType.FIT,
  ...props
}) => {
  const [keywords, setKeywords] = useState('')
  const [focus, setFocus] = useState(false)
  const {
    bgColor,
    focusBgColor,
    desktopBgColor,
    borderColor,
    color,
    focusColor,
    placeholderColor,
  } = selectThemeStyle(theme)
  const SearchIcon = <Search releaseBranch={releaseBranch} />
  const CrossIcon = <Cross releaseBranch={releaseBranch} />
  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setFocus(false)
    handleBlur()
  }
  const onSubmit = (e) => {
    e.preventDefault()
    onSearch(keywords)
  }
  const onChange = (e) => {
    e.preventDefault()
    const input = _.get(e, 'target.value', '')
    setKeywords(input)
  }
  const onReset = (e) => {
    e.preventDefault()
    setKeywords('')
  }
  return (
    <Container
      noValidate="novalidate"
      onSubmit={onSubmit}
      onReset={onReset}
      onFocus={onFocus}
      $focus={focus}
      $focusBgColor={focusBgColor}
      $desktopBgColor={desktopBgColor}
      $borderColor={borderColor}
      $widthType={widthType}
      {...props}
    >
      <InputContainer $bgColor={bgColor}>
        <Input
          type="search"
          placeholder={placeholder}
          $color={color}
          $focusColor={focusColor}
          $placeholderColor={placeholderColor}
          value={keywords}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus={autofocus}
        />
        <IconButton
          iconComponent={SearchIcon}
          theme="normal"
          onClick={onSubmit}
          aria-label="搜尋"
        />
      </InputContainer>
      <DesktopOnlyIconButton
        iconComponent={CrossIcon}
        theme={theme}
        onClick={onClose}
        aria-label="關閉搜尋"
      />
    </Container>
  )
}
SearchBar.propTypes = {
  placeholder: PropTypes.string,
  theme: PropTypes.oneOf(Object.values(THEME)),
  releaseBranch: BRANCH_PROP_TYPES,
  onSearch: PropTypes.func,
  onClose: PropTypes.func,
  handleBlur: PropTypes.func,
  autofocus: PropTypes.bool,
  widthType: PropTypes.oneOf(Object.values(WidthType)),
}
SearchBar.THEME = THEME
SearchBar.WidthType = WidthType

export default SearchBar
