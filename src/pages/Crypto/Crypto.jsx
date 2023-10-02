import React from 'react'
import styles from './Crypto.module.css'
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import {getCrypto} from '../../api/external'
const Crypto = () => {
    const [data,setData] = useState([]);


    useEffect(()=>{
        //IIFE: immediatley invoked function expression

(async function CryptoCall(){
    const response = await getCrypto();
    setData(response);
})();

// cleanup 
setData([]);
    },[]);
    if(data.length === 0){
        return <Loader text={'Crypto Currencies'}/>
    }
    const NegativeStyles  = {
        color:'#ea3943'
    }
    const PositiveStyles  = {
        color:'#16c784'

    }
  return (
    <>
     <table className={styles.table}>
        <thead className={styles.head}>
            <tr >
                <th>#</th>
                <th>Coin</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>24h</th>
            </tr>
        </thead>
        <tbody>
{data.map((coin)=>(
    <tr id={coin.id} className={styles.tablerow}>
<td>{coin.market_cap_rank}</td>
<td>
    <div className={styles.logo}>
   <img src={coin.image} width={40} height={40} alt={coin.image} /> {coin.name}
    </div>
    </td>
<td><div className={styles.symbol}>
{coin.symbol}    </div></td>
<td>{coin.current_price}</td>
<td style={coin.price_change_percentage_24h < 0 ? NegativeStyles : PositiveStyles}>{coin.price_change_percentage_24h}</td>
    </tr>
))}
        </tbody>
        
        </table> 
    </>
  )
}

export default Crypto
