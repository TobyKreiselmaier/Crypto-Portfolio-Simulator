import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Td = styled.td`
    border: 1px solid rgb(15, 10, 10);
    width: 25vh;
`;

const Button = styled.button`
    font-size: 1.0rem;
    margin: 0.5rem 0 0.5rem 0;
    background-color: #282c34;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
`;

export default function Coin (props) {
  const handleClick = (event) => {
    event.preventDefault();
    props.handleRefresh(props.tickerId);
  }
  
  return (
    <tr>
      <Td>{props.name}</Td>
      <Td>{props.ticker}</Td>
      <Td>${props.price}</Td>
      {props.showBalance ? <Td>{props.balance} {props.ticker}</Td> : null}
      <Td>
        <form action='#' method='POST'>
          <Button onClick={handleClick}>Refresh
          </Button>
        </form>
      </Td>
    </tr>
  );
}

Coin.propTypes = {
  name: propTypes.string.isRequired,
  ticker: propTypes.string.isRequired,
  price: propTypes.number.isRequired
}