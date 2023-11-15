import React, { useEffect, useState } from 'react'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import styles from "./Product.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRICE_RANGE, GET_PRODUCT, selectProducts } from '../../redux/slice/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
import spinnerImg from "../../assets/spinner.jpg"
import { FaCogs } from 'react-icons/fa'

const Product = () => {
const {data, isLoading}  = useFetchCollection("products")
const [showFilter, SetShowFilter] = useState(false)
const dispatch = useDispatch();
const products = useSelector(selectProducts)


    useEffect(() => {
      dispatch(GET_PRODUCT(
               {
                  products:data,
                 }
            )
      )
      dispatch(GET_PRICE_RANGE(
        {
           products:data,
          }
     )
)
     } , [dispatch,data])
     
   const toggleFilter = () => {
    SetShowFilter(!showFilter)
   }

  return (
    <section>
        <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}` }>
            {isLoading ? null :
            <ProductFilter></ProductFilter> }
        </aside>
        <div className={styles.content}>
            {isLoading ? <img src ={spinnerImg} alt ="loading" style={{width:"50px"}} className="--center-all" ></img>
            
             : 
             <ProductList products={products}></ProductList>

        }
        <div className={styles.icon} onClick={toggleFilter}>
          <FaCogs size={20} color="orangered" />
          <p>
            <b>{showFilter ? "Hide Filter" : "Show Filter"} </b>
          </p>
        </div>
        </div>

        </div>
    </section>
  )
}

export default Product