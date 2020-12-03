import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class AccountBalance extends Component {
    render() {
        return (
            <section className='balance'>
                Account Balance: ${this.props.amount}
            </section>
        );
    }
}

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
}