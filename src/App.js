import React from 'react'
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
    text-align: center;
    background-color:#61DBFB;
    color: rgb(15, 10, 10);
`;

const COIN_COUNT = 5;

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: []
  }

  getTopIds = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    return response.data.slice(0, COIN_COUNT).map(coin => coin.id);
  }

  getNewCoinData = async (ids) => {
    let data = [];
    const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
    for (let i = 0; i < response.data.length; i++) {
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === response.data[i].id) {
          data.push({ 
            key: response.data[i].id,
            name: response.data[i].name,
            ticker: response.data[i].symbol,
            balance: 0,
            price: parseFloat(Number(response.data[i].quotes.USD.price).toFixed(4)),
          });
        }
      }
    }
    return data;
  }

  componentDidMount = async () => {
    const topIds = await this.getTopIds();
    const newCoinData = await this.getNewCoinData(topIds);
    this.setState({coinData: newCoinData});
  }

  handleBalanceDisplay = () => {
    this.setState({showBalance: !this.state.showBalance});
  }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map((values) => {
      let newValues = {...values};
      if (valueChangeTicker === values.ticker) {
        let randomPercentage = 0.95 + Math.random() * 0.1;
            newValues.price *= randomPercentage;
      }
      return newValues;
    });
    this.setState({coinData: newCoinData})
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
