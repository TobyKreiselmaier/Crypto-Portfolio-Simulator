/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'; //typed rcc
import styled from 'styled-components';
import propTypes from 'prop-types'; //allows checking of props' types

const Td = styled.td`
    border: 1px solid rgb(15, 10, 10);
    width: 25vh;
`;
export default class Coin extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
      // Prevent the default action of submitting this form
      event.preventDefault();
      this.props.handleRefresh(this.props.ticker);//now parent can find the value
    }

    render() {
        return (
            <tr>
              <Td>{this.props.name}</Td>
              <Td>{this.props.ticker}</Td>
              <Td>${this.props.price}</Td>
              <Td>
                <form action='#' method='POST'>
                  <button onClick={this.handleClick}>Refresh
                  </button>
                </form>
              </Td>
            </tr>
        );
      }
}

Coin.propTypes = {
  name: propTypes.string.isRequired,
  ticker: propTypes.string.isRequired,
  price: propTypes.number.isRequired
}