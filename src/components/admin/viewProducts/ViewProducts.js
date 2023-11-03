import React, { useEffect, useState } from 'react'
import styles from "./ViewProducts.module.scss"
import { toast } from 'react-toastify'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import {FaEdit, FaTrashAlt} from "react-icons/fa"
import { Link } from 'react-router-dom'
import { deleteObject, ref } from 'firebase/storage'
import { Confirm } from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { GET_PRODUCT, selectProducts } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'

const ViewProducts = () => {
const {data}  = useFetchCollection("products")
const dispatch = useDispatch();

const products = useSelector(selectProducts)

  //const [products, setProducts] = useState([])

    useEffect(() => {
      dispatch(GET_PRODUCT(
               {
                  products:data,
                 }
            )
      )
     } , [dispatch,data])
 
  

//   useEffect(() => {
//     getProducts()
//     } , [])

//   const getProducts =() => {
//     try {
      
//       const productsRef = collection(db, "products");
//       const q = query(productsRef, orderBy("createdAt", "desc"));

//       onSnapshot(q, (querySnapshot) => {
//       console.log(querySnapshot.docs)
//       const allProducts = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       console.log(allProducts)
//       setProducts(allProducts)
//       dispatch(GET_PRODUCT(
//         {
//           products:allProducts,
//         }
//       )
//       )
 
// });


//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

  const confirmDelete = (id, imageURL) => {

    Confirm.show(
      'Delete product !',
      'You are about to delete this product',
      'Delete',
      'Cancel',
      () => {
        deleteProduct(id, imageURL)
      },
      () => {
      console.log("Delete Canceled")
      },
      {
        titleColor:"orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle:"zoom"
      },
      );

  }
  
  const deleteProduct = async(id, imageURL) => { //we do async so await won't throw an error
    try {
      await deleteDoc(doc(db, "products", id));

      // Create a reference to the file to delete
     const storageRef = ref(storage, imageURL);
     await deleteObject(storageRef)
     toast.success("Product deleted successfully")
    }
    catch (error) {
      toast.error(error.message)
    } 
  }
  
  return (
    <>
    <div className={styles.table}>
      <h2>All products</h2>
      {products.length === 0 ?  (
      <p>No product found</p>)
    : (
      <table>
        <thead>
        <tr>
          <th>s/n</th>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product ,index) =>
        {
          const {id, name, price, imageURL, category}= product;
          return (
           
            <tr key={id}>
              <td>
                {index +1}
              </td>
              <td>
                <img src={imageURL} alt={name} style={{width: "100px"}} />
              </td>
              <td>
                {name}
              </td>
              <td>
                {category}
              </td>
              <td>
                {`$${price}`}
              </td>
              <td className={styles.icons}>
                <Link to ={`/admin/Add-product/${id}`}>
                  <FaEdit size ={20} color='green'></FaEdit>
                </Link>
                &nbsp;                 
                <FaTrashAlt size ={20} color='red' onClick={() => confirmDelete(id,imageURL)}/>
              </td>
            </tr>
          )
        })}
          </tbody>

      </table>
    )
    }

    </div>
    </>
  )
}

export default ViewProducts