import React from 'react'
import styles from "./Search.module.scss"
import {BiSearch} from "react-icons/bi"

const Search = ({value, onChange}) => {
  return (
    <div className={StyleSheet.search}>
        <BiSearch size={18} className={styles.icon} />
        <input 
        type="text" 
        placeholder='Search by name'
        value={value}
        onChange={onchange}/>
    </div>
  )
}

export default Search