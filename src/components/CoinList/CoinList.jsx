import React, { Component } from 'react';
import Coin from '../Coin/Coin';

export default class CoinList extends Component {
    render() {
        return (
            <table className='cointable'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                //this.state.coinData.map( (value) =>  //this is the shortest version
                //  <Coin key={value.ticker} {...value}/>
                //)
                this.props.coinData.map(({name, ticker, price}) => //this shows better how we use the elements of the array
                  <Coin key={ticker} name={name} ticker={ticker} price={price} />
                )
              }
            </tbody>
          </table>
            )
    }
}
