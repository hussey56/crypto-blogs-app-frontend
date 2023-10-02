import { TailSpin } from 'react-loader-spinner'
import styles from './Loader.module.css'
import React from 'react'

const Loader = ({text}) => {
  return (
    <>
     <div className={styles.loaderWrapper}>
        <h2>Loading {text}</h2>
        <TailSpin
        height={80}
        width={80}
        color={"#3861fb"}
        radius={1}
        />
        </div> 
    </>
  )
}

export default Loader
