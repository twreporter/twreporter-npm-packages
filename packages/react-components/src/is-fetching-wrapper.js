import { replaceStorageUrlPrefix } from '@twreporter/core/lib/utils/storage-url-processor'
import PropTypes from 'prop-types'
import React from 'react'
import storage from '@twreporter/core/lib/constants/storage'
import styled from 'styled-components'

const spinnerLogoUrl = `${storage.google.schema}://${storage.google.hostname}/${storage.google.bucket}/images/spinner-logo.gif`

const FetchingBlock = styled.div`
  position: relative;
  display: ${props => (props.isFetching ? 'block' : 'none')};
  min-height: 100vh;
  width: 100%;
  ${props => {
    return props.showSpinner
      ? `
      background-image: url(${replaceStorageUrlPrefix(spinnerLogoUrl)});
      background-position: center;
      background-repeat: no-repeat;
    `
      : ''
  }}
`

const TransitionBlock = styled.div`
  transition: opacity 1s ease-in-out;
  opacity: ${props => {
    return props.isFetching ? 0 : 1
  }};
`

const FetchingWrapper = WrappedComponent => {
  class Wrapper extends React.PureComponent {
    render() {
      // TODO make client customize FetchingBlock
      const { isFetching, showSpinner, ...rest } = this.props
      if (React.isValidElement(WrappedComponent)) {
        return (
          <div>
            <FetchingBlock isFetching={isFetching} showSpinner={showSpinner} />
            <TransitionBlock isFetching={isFetching}>
              {WrappedComponent}
            </TransitionBlock>
          </div>
        )
      }
      return (
        <div>
          <FetchingBlock isFetching={isFetching} showSpinner={showSpinner} />
          <TransitionBlock isFetching={isFetching}>
            <WrappedComponent {...rest} />
          </TransitionBlock>
        </div>
      )
    }
  }

  Wrapper.defaultProps = {
    isFetching: false,
    showSpinner: false,
    // fetchingBlockStyles: '',
  }

  Wrapper.propTypes = {
    isFetching: PropTypes.bool,
    showSpinner: PropTypes.bool,
    // fetchingBlockStyles:  PropTypes.string,
  }

  return Wrapper
}

export default FetchingWrapper
