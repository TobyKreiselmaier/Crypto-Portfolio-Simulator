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
        return (
            <Section>
                Account Balance: <span>${this.props.amount}</span>
            </Section>
        );
    }
}

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
}