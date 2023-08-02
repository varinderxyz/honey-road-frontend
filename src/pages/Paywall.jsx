import { Link } from 'react-router-dom'
import AsyncImage from '../components/AsyncImage'

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import QRCode from "react-qr-code";

import FixedFloat from '../components/FixedFloat'

const Paywall = () => {
    const [invoice, setInvoice] = useState("");
    const [hash, setHash] = useState("");
    const [payment, setPayment] = useState("");
    const [URL, setURL] = useState("");
    let navigate = useNavigate();

    const { state } = useLocation();


    useEffect(() => {
        fetchInvoice();
    }, []);

    const fetchInvoice = async () => {
        const data = `{"amount": 5000}`;
        const getInvoice = {
          method: "POST",
          headers: { "content-type": "application/json"},
          data: data,
          url: "https://legend.lnbits.com/paywall/api/v1/paywalls/invoice/7sZT5BnQYy9AyLy8yQMDmb",
        };
        await axios
          .request(getInvoice)
          .then(async function (res) {
            setInvoice(res.data.payment_request);
            setHash(res.data.payment_hash);
            console.log("Hash from fetch: " + res.data.payment_hash);
          })
          .catch(function (err) {
            console.log("error = " + err);
          });
    };

    const invoiceStatus = async () => {
        const hash_data = `{"payment_hash": "` + hash + `" }`;
        const checkInvoice = {
          method: "POST",
          headers: { "content-type": "application/json" },
          data: hash_data,
          url: "https://legend.lnbits.com/paywall/api/v1/paywalls/check_invoice/7sZT5BnQYy9AyLy8yQMDmb",
        };
        await axios
          .request(checkInvoice)
          .then(async function (res) {
            setPayment(res.data.paid);
            setURL(res.data.url);
          })
          .catch(function (err) {
            console.log("error = " + err);
          });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            invoiceStatus();
        }, 5000);
        
        if (payment == true) {
            window.location.href = URL;
            clearState()
          }

        return () => clearInterval(intervalId);
    }, [hash, payment, navigate, state, URL]);

    return (
        <div className="fragment">
            <div id="all_but_footer">
                <div id="content">
                    <div style={{ margin: "0 auto", width: "100%", textAlign: "center" }}>
                    <span className="h1">Bobo/bull/crab/swan/etc collection</span>
                    <br />
                    <br />
                    <span className="price_big">
                        <div className="for-now-info_wrapper">
                            <div className="for-now-info_folder">
                                <i className="fak fa-satoshisymbol-solid" />
                                5k
                            </div>
                        </div>
                    </span>
                    <br />
                    <br />
                    </div>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%", textAlign: "center"}}>
                        <span>Pay the below lightning invoice to access</span><br /><br />
                        <QRCode
                            size={1056}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={invoice}
                            viewBox={`0 0 256 256`}
                            onClick={() =>  navigator.clipboard.writeText(String(invoice))}
                        />
                        <button
                  name="decrement"
                  type="button"
                  onClick={() =>  navigator.clipboard.writeText(String(invoice))}
                >
                  Copy LN invoice
                </button>
                    </div>
                    <br />
                    <br />
                    <div>
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
                                    <td style={{ whiteSpace: 'nowrap' }}>5 of 5</td>
                                    <td>
                                        this is my second favourite thing behind making my customers right
                                    </td>
                                    <td>SBF</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>2 days</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap' }}>5 of 5</td>
                                    <td>been looking for these</td>
                                    <td>Barbara Walters</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>6 days</td>
                                </tr>
                                <tr>
                                    <td style={{ whiteSpace: 'nowrap' }}>1 of 5</td>
                                    <td>
                                        you stole these from me
                                    </td>
                                    <td>CSW</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>19 days</td>
                                </tr>
                                <tr>
                                    <td colSpan={4} id="pagination" />
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <FixedFloat style={{float: "center"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paywall