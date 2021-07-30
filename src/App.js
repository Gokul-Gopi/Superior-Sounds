import Header from "./components/Nav-Bar/Header";
import Home from "./components/Home/Home";
import Cart from './components/Cart/Cart'
import { useEffect } from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom';
import ProductListing from "./components/ProductListing/ProductListing";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Loader from './components/Loader/Loader'
import { useProduct } from "./Context/ProductContext";
import SignUp from "./components/SignUp/SignUp";
import { useAuth } from "./Context/AuthContext";
import { defaultHeaderForToken, getUserCart, getUserWishlist } from "./Utils/NetworkCalls";
import Logout from "./components/Logout/Logout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function App() {
  const { state, dispatch } = useProduct()
  const { authState } = useAuth()
  defaultHeaderForToken(authState.currentUserToken)

  useEffect(() => {
    authState.currentUserToken && getUserCart(dispatch) && getUserWishlist(dispatch)
  }, [authState.currentUserToken])

  return (
    <div className="App">
      {state.loading ?

        <Loader /> :
        <>
          <SignUp />
          <Logout />
          <Login />
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='cart' element={<Cart />} />
            <Route path='products' element={<ProductListing />} />
            <Route path='products/:id' element={<ProductDetails />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
