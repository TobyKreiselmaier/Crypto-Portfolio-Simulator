import React, { Component } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem;
`;
export default class AccountBalance extends Component {
    render() {
        const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        return (
            <Section>
                Account Balance: <span>${this.props.amount}</span>
                <button>{buttonText}</button>
            </Section>
        );
    }
}

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
}