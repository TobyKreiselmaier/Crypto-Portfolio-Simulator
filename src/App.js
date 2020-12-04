import React from 'react'
import logo from './logo.svg'
import './App.css';//style app here
import CoinList from './components/CoinList/CoinList';
import AccountBalance from './components/AccountBalance/AccountBalance';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 18966
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 593
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.62
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          price: 239
        }
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt='React Logo' className='App-logo'></img>
          <h1 className='App-title'>
            Coin Exchange
          </h1>
        </header>
        <AccountBalance amount={this.state.balance}/>
        <CoinList coinData={this.state.coinData} />
      </div>
    );
  }
}

 /*props are optional */
export default App;
