import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CoinChart from "./CoinChart"; // only for stretch!
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail() {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const details = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`);
      const description = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`);

      const detailsJson = await details.json();
      const descripJson = await description.json();

      setFullDetails({
        numbers: detailsJson.DISPLAY,
        textData: descripJson.Data,
      });
    };

    getCoinDetail();
  }, [symbol]);

  if (!fullDetails || !fullDetails.numbers || !fullDetails.textData[symbol]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="coin-detail">
      <h1>{fullDetails.textData[symbol].FullName}</h1>
      <img className="icons" src={`https://www.cryptocompare.com${fullDetails.numbers[symbol].USD.IMAGEURL}`} alt={`Small icon for ${symbol} crypto coin`} />
      <div>{fullDetails.textData[symbol].Description}</div>
      <br />
      <div>This coin was built with the algorithm {fullDetails.textData[symbol].Algorithm}</div>
      <table>
        <tbody>
          <tr>
            <th>Launch Date </th>
            <td>{fullDetails.textData[symbol].AssetLaunchDate}</td>
          </tr>
          <tr>
            <th>Website </th>
            <td>
              {fullDetails.textData[symbol].WebsiteUrl ? (
                <a href={fullDetails.textData[symbol].WebsiteUrl} target="_blank" rel="noopener noreferrer">
                  {fullDetails.textData[symbol].WebsiteUrl}
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <th>Whitepaper </th>
            <td>
              {fullDetails.textData[symbol].WhitePaper ? (
                <a href={fullDetails.textData[symbol].WhitePaper} target="_blank" rel="noopener noreferrer">
                  Whitepaper
                </a>
              ) : (
                "N/A"
              )}
            </td>
          </tr>
          <tr>
            <th>Monetary Symbol </th>
            <td>{symbol}</td>
          </tr>
          <tr>
            <th>Market </th>
            <td>{fullDetails.numbers[symbol].USD.MARKET}</td>
          </tr>
          <tr>
            <th>Last Transaction </th>
            <td>{fullDetails.numbers[symbol].USD.LASTUPDATE}</td>
          </tr>
          <tr>
            <th>Last Transaction Value</th>
            <td>{fullDetails.numbers[symbol].USD.LASTVOLUME}</td>
          </tr>
          <tr>
            <th>Volume </th>
            <td>{fullDetails.numbers[symbol].USD.VOLUME24HOURTO}</td>
          </tr>
          <tr>
            <th>Today's Open Price </th>
            <td>{fullDetails.numbers[symbol].USD.OPEN24HOUR}</td>
          </tr>
          <tr>
            <th>Highest Price during the Day </th>
            <td>{fullDetails.numbers[symbol].USD.HIGH24HOUR}</td>
          </tr>
          <tr>
            <th>Lowest Price during the Day </th>
            <td>{fullDetails.numbers[symbol].USD.LOW24HOUR}</td>
          </tr>
          <tr>
            <th>Change from Previous Day </th>
            <td>{fullDetails.numbers[symbol].USD.CHANGE24HOUR}</td>
          </tr>
          <tr>
            <th>Market Cap </th>
            <td>{fullDetails.numbers[symbol].USD.MKTCAP}</td>
          </tr>
        </tbody>
      </table>

      <CoinChart symbol={symbol} market={fullDetails.numbers[symbol].USD.MARKET} />
    </div>
  );
}

export default CoinDetail;
