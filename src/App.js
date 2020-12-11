import React, {useState, useEffect} from 'react'
import Header from './components/Header/Header';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';
import axios from 'axios';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
    text-align: center;
    background-color:#61DBFB;
    color: rgb(15, 10, 10);
`;

const COIN_COUNT = 10;

var formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function App () {
  const [balance, setBalance] = useState(0);//use State Hook
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
            price: formatter.format(response.data[i].quotes.USD.price)
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
    var amount = parseFloat(prompt("Please enter the size of your testportfolio in USD:", 1000000));
    if (isNaN(amount)) {
      alert("Please enter a number!");
      window.location.reload();
    } else if (amount <= 0) {
      alert("Please enter a positive number!");
      window.location.reload();
    } else{
      setBalance(amount);
    }
  }

  useEffect(() => {//Effect Hook - can not be async!
    if (coinData.length === 0) {//componentDidMount sitation
      componentDidMount();
    }
  });

  const handleAirDrop = () => {
    setBalance(old => old + 1200);
  }

  const handleTransaction = (isBuy, valueChangeId) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function(values) {
      let newValues = {...values};
      if (valueChangeId === values.key) {
        if(newValues.balance + balanceChange >= 0) {
        newValues.balance += balanceChange;
        console.log(parseFloat((newValues.price).replace(/[$,]/g,'')));
        setBalance(old => old - balanceChange * parseFloat((newValues.price).replace(/[$,]/g,'')))
        }
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }

  const handleBalanceDisplay = () => {
    setShowBalance(old => !old);
  }

  const handleRefresh = async (tickerId) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${tickerId}`);
    const newPrice = formatter.format(response.data.quotes.USD.price);
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
      <Header/>
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleAirDrop={handleAirDrop} 
        handleBalanceDisplay={handleBalanceDisplay}/>
      <CoinList 
        coinData={coinData} 
        showBalance={showBalance} 
        handleTransaction={handleTransaction} 
        handleRefresh={handleRefresh}/>
    </Div>
  );
}

export default App;