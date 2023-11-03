import React, { useEffect } from 'react'
import ProductFilter from './productFilter/ProductFilter'
import ProductList from './productList/ProductList'
import styles from "./Product.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRODUCT, selectProducts } from '../../redux/slice/productSlice'
import useFetchCollection from '../../customHooks/useFetchCollection'
import spinnerImg from "../../assets/spinner.jpg"

const Product = () => {
const {data, isLoading}  = useFetchCollection("products")
const dispatch = useDispatch();
const products = useSelector(selectProducts)

    useEffect(() => {
      dispatch(GET_PRODUCT(
               {
                  products:data,
                 }
            )
      )
     } , [dispatch,data])


  return (
    <section>
        <div className={`container ${styles.product}`}>
        <aside className={styles.filter}>
            {isLoading ? null :
            <ProductFilter></ProductFilter> }
        </aside>
        <div className={styles.content}>
            {isLoading ? <img src ={spinnerImg} alt ="loading" style={{width:"50px"}} className="--center-all" ></img>
            
             : 
             <ProductList products={products}></ProductList>

        }
        </div>

        </div>
    </section>
  )
}

export default Product