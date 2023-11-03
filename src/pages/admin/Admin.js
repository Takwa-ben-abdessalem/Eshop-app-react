import React from 'react'
import styles from "./Admin.module.scss"
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../components/admin/home/Home'
import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import Orders from '../../components/admin/orders/Orders'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
         <Navbar></Navbar>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="all-products" element={<ViewProducts></ViewProducts>}></Route>
          <Route path="add-product/:id" element={<AddProducts></AddProducts>}></Route>
          <Route path="orders" element={<Orders></Orders>}></Route>

        </Routes>

      </div>
    </div>
  )
}

export default Admin