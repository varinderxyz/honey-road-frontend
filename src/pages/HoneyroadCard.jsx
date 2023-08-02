import {Link} from 'react-router-dom'
import AsyncImage from '../components/AsyncImage'
import axios from 'axios';
import {useState, useEffect} from 'react'
import QRCode from "react-qr-code";

const getDispensersByAddress = async (address) => {
    try {
        const response = await axios.get(`https://dankset.io/api/dispensers/${address}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
const Card = props => {
  const [dispensers, setDispensers] = useState([]);
  const [source, setSource] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
      getDispensersByAddress('11d5867cf4595d5a46b0d1d2ab5ece3b432433c91e4e37f70435272ad4da3dbf').then(data => setDispensers(data));
  }, []);

  useEffect(() => {
    if (!Array.isArray(dispensers)) {
      setSource(dispensers.dispenser.source)
      setAmount(dispensers.dispenser.satoshirate)

      console.log('bitcoin:'+ source + '?amount=' + amount)
    }
    
  }, [dispensers]);
  const btcAmount = amount/10000000;

  return (
    <div className="fragment">
      <div id="all_but_footer">
        <div id="content">
          <div className="main-info-of-product">
            <span className="img_one_wrapper">
              <div className="">
                <AsyncImage
                  src="card.jpg"
                  className=""
                  style={{
                    height: '420px',
                    width: '300px'
                  }}
                />
              </div>
            </span>
            <span style={{display: 'inline-block', verticalAlign: 'top'}}>
              <span className="h1">Honeyroad Card</span>
              <br />
              <br />
              <span className="price_big">
                <div className="for-now-info_wrapper">
                  <div className="for-now-info_folder">
                    <i className="fak fa-satoshisymbol-solid" />
                    {amount/1000}k
                  </div>
                </div>
              </span>
              <br />
              <br />
              <span className="container container_small">
                seller: <a href="https://twitter.com/smolgrrr">smolgrrr(94)</a> & <a href="https://twitter.com/Darkfarms1">Darkfarms(7)</a>
                <br />
                ships from: XChain
                <br />
                ships to: Interwebs
                <br />
                category:
                <a href=""> NFT</a>
                <br />
              </span>
              <br />
              <br />
              postage options:
              <br />
              <div>
                <select name="postage">
                  <option value={364677}>free ship (฿0.0)</option>
                </select>
                <div
                  className="info_wrapper"
                  style={{position: 'relative', bottom: 2}}
                >
                  <div className="info_folder">
                    <div className="info_icon">?</div>
                    <div className="info_message">
                      This vendor offers free shipping.
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <span className="container container_small">
                <a
                  href="https://twitter.com/smolgrrr/status/1529430160986218496?s=20&t=_NQ8TDVBqNVQKo1RxesShQ"
                  target="_blank"
                >
                  report this item
                </a>
              </span>
              <br />
              <br />
            </span>
            <div style={{display: 'inline-block', position: 'absolute', right: '25%'}}>
            <p className="warning" style={{color:'red', maxWidth: '300px', textAlign: 'center'}}>
              WARNING! If it's your first time using dispensers, please DYOR.
            </p>
            <a href={'bitcoin:'+ source + '?amount=' + btcAmount}>
            <QRCode
                size={'75%'}
                value={'bitcoin:'+ source + '?amount=' + btcAmount}
                style={{display: 'block', margin: 'auto'}}
                viewBox={`0 0 256 256`}
                onClick={() =>  navigator.clipboard.writeText(String('bitcoin:'+ source + '?amount=' + btcAmount))}
            />
            </a>
            </div>
          </div>
          <div
            className="container container_large"
            style={{margin: '20px 0 40px'}}
          >
            <div className="h3">Description</div>
            <br />
            best KYC-free honey on the market. safe, stealth delivery <br />
            <br />
            <br />
            includes the number of sats paid on the label- you've now got your
            own bitcoin pizza to show-off in 10yrs.
          </div>
          <span className="h3">Customer reviews</span>
          <br />
          <br />
          <div className="responsive-table">
            <table className="zebra">
              <tbody>
                <tr>
                  <th>rating</th>
                  <th>review</th>
                  <th>name</th>
                  <th>freshness</th>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>
                    amazing honey- just bought 500 and going to leave a huge tip
                  </td>
                  <td>SBF</td>
                  <td style={{whiteSpace: 'nowrap'}}>2 days</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>shit crazy fr</td>
                  <td>smolmooo</td>
                  <td style={{whiteSpace: 'nowrap'}}>6 days</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>
                    It doesn't compare to Phoenician Honey, but enjoyed
                    none-the-less.
                  </td>
                  <td>smoltaleb</td>
                  <td style={{whiteSpace: 'nowrap'}}>19 days</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>#Bitcoin is Honey</td>
                  <td>Saylor</td>
                  <td style={{whiteSpace: 'nowrap'}}>29 days</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>Great vendor! Bought with size at 333ea</td>
                  <td>smolzhu</td>
                  <td style={{whiteSpace: 'nowrap'}}>1 month</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>2 of 5</td>
                  <td>Found the jar difficult to open</td>
                  <td>Poordart</td>
                  <td style={{whiteSpace: 'nowrap'}}>1 month</td>
                </tr>
                <tr>
                  <td style={{whiteSpace: 'nowrap'}}>5 of 5</td>
                  <td>yo</td>
                  <td>0xdazai</td>
                  <td style={{whiteSpace: 'nowrap'}}>1 month</td>
                </tr>
                <tr>
                  <td colSpan={4} id="pagination" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card