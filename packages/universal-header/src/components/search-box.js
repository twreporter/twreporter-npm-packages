import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import HeaderContext from '../contexts/header-context'
import PropTypes from 'prop-types'
import React from 'react'
import SearchCancel from '../../static/search-cancel.svg'
import fonts from '../constants/fonts'
import get from 'lodash/get'
import linkUtils from '../utils/links'
import styled from 'styled-components'
import { searchBoxEffect } from '../constants/css-transition-group'

const _ = {
  get,
}

const styles = {
  inputHeight: 35, // px
  containerHeight: 65, // px
  inputWidth: 220, // px
}

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  ${searchBoxEffect}
`

const SearchBoxContainer = styled.form`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  position: absolute;
  z-index: 99;
  right: 0;
  top: 49%;
  transform: translateY(-50%);
  height: ${styles.containerHeight}px;
  box-sizing: border-box;
`

const CellBlock = styled.div`
  display: table-cell;
  height: ${styles.containerHeight}px;
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1;
  svg {
    height: 100%;
  }
`

const SearchInput = styled.input`
  width: ${styles.inputWidth}px;
  max-width: calc(100vw - 870px);
  margin-right: 0.5em;
  font-size: ${fonts.size.base};
  font-weight: ${fonts.size.medium};
  height: ${styles.inputHeight}px;
  border-radius: 58px;
  border: 0;
  padding: 0 1em;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: ${fonts.size.base};
    font-weight: ${fonts.size.medium};
    color: #8c8c8c;
    opacity: 0.5;
    letter-spacing: 0.7px;
  }
`

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._onReset = this._onReset.bind(this)
    this._handleBlur = this._handleBlur.bind(this)
    this.state = {
      keywords: '',
    }
  }
  _handleChange(e) {
    e.preventDefault()
    const input = _.get(e, 'target.value', '')
    return this.setState({ keywords: input })
  }
  _handleSubmit(e, releaseBranch, isLinkExternal) {
    e.preventDefault()
    const keywords = this.state.keywords
    if (window) {
      window.location = `${
        linkUtils.getSearchLink(isLinkExternal, releaseBranch).to
      }?q=${keywords}`
    }
  }
  _onReset(e) {
    e.preventDefault()
    if (this.state.keywords === '') {
      this.props.closeSearchBox()
    } else {
      this.setState({ keywords: '' })
    }
  }
  _handleBlur() {
    this.props.closeSearchBox()
  }

  render() {
    const { isSearchOpened } = this.props
    return (
      <StyledCSSTransitionGroup
        key="transition"
        transitionName="effect"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}
      >
        {!isSearchOpened ? null : (
          <HeaderContext.Consumer>
            {({ releaseBranch, isLinkExternal }) => (
              <SearchBoxContainer
                onSubmit={e => {
                  this._handleSubmit(e, releaseBranch, isLinkExternal)
                }}
                onReset={this._onReset}
                noValidate="novalidate"
              >
                <CellBlock>
                  <SearchInput
                    type="search"
                    placeholder="搜尋報導者文章"
                    onBlur={this._handleBlur}
                    onChange={this._handleChange}
                    value={this.state.keywords}
                    autoFocus
                  />
                </CellBlock>
                <CellBlock>
                  <SearchCancel
                    style={{ cursor: 'pointer' }}
                    onMouseDown={this._onReset}
                  />
                </CellBlock>
              </SearchBoxContainer>
            )}
          </HeaderContext.Consumer>
        )}
      </StyledCSSTransitionGroup>
    )
  }
}

SearchBox.propTypes = {
  isSearchOpened: PropTypes.bool,
  closeSearchBox: PropTypes.func.isRequired,
}

SearchBox.defaultProps = {
  isSearchOpened: false,
}

export default SearchBox
