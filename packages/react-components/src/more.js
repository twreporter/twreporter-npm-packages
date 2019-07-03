import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 105px;
  background-color: black;
  text-align: center;
  &:hover,
  &:focus {
    polyline {
      stroke-width: 3;
    }
  }
  &active {
    polyline {
      stroke-width: 6;
      transition: all 100ms ease-in-out;
    }
  }
  polyline {
    transition: all 250ms ease-in-out;
  }
  @media only screen and (max-width: 799px) {
    height: 76px;
    padding-top: 10px;
    & > span {
      line-height: 30px;
      font-size: 16px;
    }
  }
`

const Label = styled.span`
  color: white;
  line-height: 70px;
  font-size: 18px;
  font-weight: 700;
`

export default class More extends Component {
  static propTypes = {
    children: PropTypes.node,
    loadMore: PropTypes.func.isRequired,
  }
  render() {
    const { loadMore, children } = this.props
    let points = '0,0 25,10 50,0'
    let width = 50
    let height = 11

    return (
      <Container onClick={loadMore}>
        {children ? React.Children.only(children) : <Label>更多文章</Label>}
        <div>
          <svg width={width} height={height}>
            <polyline
              points={points}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Container>
    )
  }
}
