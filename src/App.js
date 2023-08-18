

import './content.css';
import {connect_wallet} from './connect_wallet.js'
// import './swapBoxFunc.js'
import fetch from 'node-fetch'
import {swap} from './swap.js'

const handle = (event) => {
  console.log(event.target.value)
  document.getElementById ('outputDenom').textContent = event.target.value
  if (event.target.value == "ATOM") {
    document.getElementById ('outputDenom').textContent = 'USQ'
  }
  else if (event.target.value == "USQ") {
    document.getElementById ('outputDenom').textContent = 'ATOM'
  }
}

const handleInputAmount = async(event) => {
  var denom = document.getElementById('outputDenom').textContent 
  var price = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ATOM')
  var pricejson = await price.json()
  if (denom == 'USQ') {
    console.log((Number(event.target.value)) * pricejson.data.rates['USD'])
    document.getElementById ('outputPriceDenom').textContent = ((Number(event.target.value)) * pricejson.data.rates['USD']).toFixed(2)
  }
  if (denom == 'ATOM') {
    console.log((Number(event.target.value)) * pricejson.data.rates['USD'])
    document.getElementById ('outputPriceDenom').textContent = ((Number(event.target.value)) / pricejson.data.rates['USD']).toFixed(2)
  }
}

function App() {
  return (
        <div className="main">
          <div className="info">
            <div>
              <div className="connect">
                <button id='connectWalletbutton' className="connect_wallet" onClick={async () => {await connect_wallet()}}></button>
              </div>
            </div>
            <div className="razdel"></div>
            <div className="swapname">
              <h1 className="swp">Swap</h1>
            </div>
            <div className="razdel"></div>
            <div className="swap">
              <div className="atom">
              <div className="From"><a>From</a></div>
                <div className="logo_atom">
                <select id="swapbox" onChange={handle} className="box">
                  <option selected>ATOM</option>
                  <option>USQ</option>
                </select>
                </div>
                <div>
                <input onChange={handleInputAmount} type="text" className="input_atom"></input>
                </div>
              </div>
              <div className="usc">
                <div className="to"><a>To</a></div>
              <div className="logo_usc">
                <div className="box">
                  <h3 id="outputDenom">USQ</h3>
                </div>
              </div>
              <div>
                <div className="input_usc">
                  <h3 id="outputPriceDenom">0</h3>
                </div>
              </div>
              </div>
              <div>
                <button className="btn_swap" onClick={async () => {await swap()}}><a>Swap</a></button>
              </div>
            </div>
          </div>
          <div className="razdel_footer"></div>
          
        </div>
  );
}

export default App;
