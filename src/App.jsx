import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

const App = () => {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [amt, setAmt] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmt, setConvertedAmt] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`
      )
      .then((res) => {
        setCurrencies(Object.keys(res.data.eur));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    setShow(false);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    setShow(false);
  };

  const handleAmtChange = (e) => {
    setAmt(e.target.value);
    setShow(false);
  };

  const exchange = () => {
    setFrom(to);
    setTo(from);
  };
  const convertCurrency = () => {
    if (!from || !to || !amt) return;
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`
      )
      .then((res) => {
        const fromRate = res.data.eur[from];
        const toRate = res.data.eur[to];
        const convertedAmount = (amt / fromRate) * toRate;
        setConvertedAmt(convertedAmount.toFixed(2));
        setShow(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleConvertClick = () => {
    convertCurrency();
    setShow(true);
  };

  return (
    <div id="main">
      <div className="header">Currency Converter</div>
      <div id="mainContainer">
        <div className="mainBody">
          <label>Amount</label>
          <input type="number" onChange={handleAmtChange} className="input" />
        </div>
        <div className="mainBody">
          <label>From</label>
          <select value={from} onChange={handleFromChange} className="input">
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="mainBody">
          <AiOutlineSwap color="#4ade80" size={30} onClick={exchange} />
        </div>
        <div className="mainBody">
          <label>To</label>
          <select value={to} onChange={handleToChange} className="input">
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="endBody">
        <input
          type="button"
          value="Convert"
          onClick={handleConvertClick}
          id="button"
        />
        <div className="res">
          <label className="result"> Converted Amount: </label>
          {show && amt ? (
            <p className="result">
              {amt} {from} = {convertedAmt} {to}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
