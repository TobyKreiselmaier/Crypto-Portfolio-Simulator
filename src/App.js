import React from 'react'
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';

const Div = styled.div`
    text-align: center;
    background-color:#61DBFB;
    color: rgb(15, 10, 10);
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 18966
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 593
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0,
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.62
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          balance: 0,
          price: 239
        }
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function ( {ticker, name, price} ) {//not using .find(), bc of immutability
      let newPrice = price;
      if ( valueChangeTicker === ticker) {
        let randomPercentage = 0.95 + Math.random() * 0.1;
            newPrice = newPrice * randomPercentage;
      }
      return {//necessary within .map()
        ticker: ticker,
        name: name,
        price: newPrice
      }
    });
    this.setState( {coinData: newCoinData} )//will trigger fresh rendering //balance remains untouchted
  }

  render() {
    return (
      <Div className="App">
        <ExchangeHeader/>
        <AccountBalance amount={this.state.balance} showBalance={true}/>
        <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh}/>
      </Div>
    );
  }
}

 /*props are optional */
export default App;
