import React, { Component } from 'react'
import logo from './logo.svg'

export default class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} alt='React Logo' className='App-logo'></img>
                <h1 className='App-title'>
                    Coin Exchange
                </h1>
            </header>
        )
    }
}