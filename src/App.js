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
      showBalance: true, //added bool so condition can be passed on
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
    this.handleBalanceDisplay = this.handleBalanceDisplay.bind(this);//add binding
  }

  handleBalanceDisplay() {
    this.setState({showBalance: !this.state.showBalance});//change bool
  }


  handleRefresh(valueChangeTicker) {
    const newCoinData = this.state.coinData.map( function ( {ticker, name, price} ) {
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
    this.setState( {coinData: newCoinData} )//will trigger fresh rendering //balance remains untouched
  }

  render() {
    return (
      <Div className="App">
        <ExchangeHeader/>
        <AccountBalance amount={this.state.balance} 
                        showBalance={this.state.showBalance} 
                        handleBalanceDisplay={this.handleBalanceDisplay}/>
        <CoinList coinData={this.state.coinData} 
                  showBalance={this.state.showBalance}
                  handleRefresh={this.handleRefresh}/>
      </Div>
    );
  }
}

 /*props are optional */
export default App;
