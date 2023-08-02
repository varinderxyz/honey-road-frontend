import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import QRCode from "react-qr-code";

const MovieCards = (props) => {
    const { MovieCard } = props
    let poster_path = `https://image.tmdb.org/t/p/w342${MovieCard.poster_path}`
    if (MovieCard.poster_path == null) {
        poster_path = "https://i.imgur.com/wjVuAGb.png"
    }

    const [invoice, setInvoice] = useState("");
    const [hash, setHash] = useState("");
    const [payment, setPayment] = useState("");
    const [URL, setURL] = useState("");
    const [hasEntered, setHasEntered] = useState(false);
    const isMovie = true;


    const fetchInvoice = async () => {
      if (!hasEntered) {
        setHasEntered(true);
        const data = `{"amount": 1000, "memo": "lightning.movie- ` + MovieCard.title + `", "movie_id":` + MovieCard.id + `}`;
        const getInvoice = {
          method: "POST",
          headers: { "content-type": "application/json"},
          data: data,
          url: "https://us-central1-lightning-movie.cloudfunctions.net/app/api/invoice",
        };
        await axios
          .request(getInvoice)
          .then(async function (res) {
            setInvoice(res.data.request);
            setHash(res.data.id);
          })
          .catch(function (err) {
            console.log("error = " + err);
          }); }
    };

    const invoiceStatus = async () => {
        const hash_data = `{"id": "` + hash + `", "isMovie": ` + isMovie + `}`;
        const checkInvoice = {
          method: "POST",
          headers: { "content-type": "application/json" },
          data: hash_data,
          url: "https://us-central1-lightning-movie.cloudfunctions.net/app/api/checkInvoice",
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
      if (hasEntered) {
        const intervalId = setInterval(() => {
            invoiceStatus();
        }, 5000);

        if (payment == true) {
            window.location.href = URL;
          }

        return () => clearInterval(intervalId); 
      }
    }, [hash, payment, URL]);

    return (  
        <div className="" style={{}}>
        <div className="group rounded-md overflow-hidden" style={{position: "relative", paddingLeft: "2rem"}}
            onMouseEnter={() => fetchInvoice()}
            >
            <a title={MovieCard.title}>
            <div className="w-11/12 py-6 absolute z-10 opacity-0 group-hover:opacity-90 transition-all" style={{position: "absolute", opacity: "0", hover: "100"}}>
              <a href={"lightning:"+invoice} onClick={() => navigator.clipboard.writeText(String(invoice))}>
              <QRCode
                    size={156}
                    value={invoice}
                    viewBox={`0 0 256 256`}
                />  
                </a>
            </div>
            <img className="w-11/12 group-hover:opacity-70" title={MovieCard.title} src={poster_path} alt={MovieCard.title}/>
            </a>
        </div>
        </div>           
        )

}
 
export default MovieCards;