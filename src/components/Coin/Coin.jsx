/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'; //typed rcc
import styled from 'styled-components';
import propTypes from 'prop-types'; //allows checking of props' types

const Tabledata = styled.td`
    border: 1px solid rgb(15, 10, 10);
    width: 25vh;
`;
export default class Coin extends Component {
    constructor(props) {
      super(props);
      this.state = {
        price: this.props.price
      }
      this.handleClick = this.handleClick.bind(this)//important to set for each event
    }
/* THIS WOULD BE THE AUTOMATED CHANGING OF PRICES
    componenTabledataidMount() {
      let callback = () => {
        //set state to new random value
        let randomPercentage = 0.995 + Math.random() * 0.01;
        //don't do this; only allowed constructor:
        //this.state.price = this.state.price * randomPercentage;
        //instead do for functions:
        this.setState( (oldState) => {
          return {
            price: oldState.price * randomPercentage
          };
        });

        //or this for values, but could be issue with concurrence:
        //this.setState({price: this.state.price * randomPercentage});

      }
      setInterval(callback, 1000);
    }
*/

    handleClick(event) {
      // Prevent the default action of submitting this form
      event.preventDefault();

      let randomPercentage = 0.95 + Math.random() * 0.1;
      this.setState( (oldState) => {
        return {
          price: oldState.price * randomPercentage
        };
      });
    }
    render() {
        return (
            <tr>
              <Tabledata>{this.props.name}</Tabledata>
              <Tabledata>{this.props.ticker}</Tabledata>
              <Tabledata>${this.state.price}</Tabledata>
              <Tabledata>
                <form action='#' method='POST'>
                  <button onClick={this.handleClick}>Refresh
                  </button>
                </form>
              </Tabledata>
            </tr>
        );
      }
}

Coin.propTypes = {
  name: propTypes.string.isRequired,
  ticker: propTypes.string.isRequired,
  price: propTypes.number.isRequired
}