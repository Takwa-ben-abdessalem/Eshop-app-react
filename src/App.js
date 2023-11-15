import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home,Contact,Cart,OrderHistory,Admin,Login,Register,Reset} from "./pages"
import {Footer,Header} from "./components"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";


function App() {
  return (
    <>
      <BrowserRouter> 
      <ToastContainer/>    
        <Header></Header>
        <Routes>
           <Route path="/" element={ <Home></Home> }></Route>
           <Route path="/contact" element={ <Contact></Contact> }></Route>
           <Route path="/cart" element={ <Cart></Cart> }></Route>
           <Route path="/orderHistory" element={ <OrderHistory></OrderHistory> }></Route>
           <Route path="/product-details/:id" element={ <ProductDetails></ProductDetails> }></Route>
           <Route path="/admin/*" element={ <AdminOnlyRoute> <Admin></Admin>  </AdminOnlyRoute>}></Route>
           <Route path="/login" element={ <Login></Login> }></Route>
           <Route path="/register" element={ <Register></Register> }></Route>
           <Route path="/reset" element={ <Reset></Reset> }></Route>
           <Route path="/checkout-details" element={ <CheckoutDetails></CheckoutDetails> }></Route>
           <Route path="/checkout" element={ <Checkout></Checkout> }></Route>


        </Routes>
        <Footer></Footer>   
      </BrowserRouter>
    </>
  );
}

export default App;
