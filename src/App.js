import React, {useState, useEffect} from 'react'
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

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App (props) {
  const [balance, setBalance] = useState(10000);//use State Hook
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const getTopIds = async () => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    return response.data.slice(0, COIN_COUNT).map(coin => coin.id);
  }

  const getNewCoinData = async (ids) => {
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
            price: formatPrice(response.data[i].quotes.USD.price),
          });
        }
      }
    }
    return data;
  }

  const componentDidMount = async () => {
    const topIds = await getTopIds();
    const newCoinData = await getNewCoinData(topIds);
    setCoinData(newCoinData);
  }

  useEffect(() => {//Effect Hook - can not be async!
    if (coinData.length === 0) {//componentDidMount sitation
      componentDidMount();
    }
  });

  const handleBalanceDisplay = () => {
    setShowBalance(oldValue => !oldValue)
  }

  const handleRefresh = async (tickerId) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${tickerId}`);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map((values) => {
      let newValues = { ...values };
      if (tickerId === values.key) {
        newValues.price = newPrice;
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  return (
    <Div className="App">
      <ExchangeHeader/>
      <AccountBalance amount={balance} 
                      showBalance={showBalance} 
                      handleBalanceDisplay={handleBalanceDisplay}/>
      <CoinList coinData={coinData} 
                showBalance={showBalance}
                handleRefresh={handleRefresh}/>
    </Div>
  );
}

export default App;