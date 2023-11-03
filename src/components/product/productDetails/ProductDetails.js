import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';
import styles from "./ProductDetails.module.scss"
import spinnerImage from "../../../assets/spinner.jpg"

const ProductDetails = () => {
  const {id} = useParams();
  const [product,setProducts] = useState(null)
  useEffect(() => {
    getProduct()
  },[])
  const getProduct =  async() => {

    const docRef = doc(db, "products", id);
    const  docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProducts(obj)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast.error("product not found")
}
  }

  return (
    <section >
      <div className={`container ${styles.product}`} >
          <h2>Product Details</h2>
          <div>
            <Link to="/#products">
              &larr; Back To Products
            </Link>
          </div>
          {product === null ? (<img src={spinnerImage} alt="loading" style={{width:"50px"}}></img> )
          
        : (
          <>
          <div className={styles.details}>
            <div className={styles.img}>
            <img src={product.imageURL} alt={product.name}></img>
            </div>
            <div className={styles.content}>
               <h3> {product.name}</h3>
               <p className={styles.price}> {`$${product.price}`}</p>
               <p >{product.desc}</p>
               <p>
                <b>SKU</b>
                {product.id}
               </p>
               <p>
                <b>Brand</b>
                {product.brand}
               </p>

               <div className={styles.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
               </div>

              <button className="--btn --btn-danger">ADD TO CART</button>
            </div>
          </div>
          </>
        ) }
      </div>
    </section>
  )
  
}



export default ProductDetails