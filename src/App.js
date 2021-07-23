import Header from "./components/Nav-Bar/Header";
import Home from "./components/Home/Home";
import Cart from './components/Cart/Cart'
import {
  Routes,
  Route
} from 'react-router-dom';
import ProductListing from "./components/ProductListing/ProductListing";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Login from "./components/Login/Login";
import Loader from './components/Loader/Loader'
import { useProduct } from "./Context/ProductContext";
import SignUp from "./components/SignUp/SignUp";
import { useAuth } from "./Context/AuthContext";
import { defaultHeaderForToken } from "./Utils/NetworkCalls";

function App() {
  const { state } = useProduct()
  const { authState } = useAuth()
  defaultHeaderForToken(authState.currentUserToken) /* ---------WHAT IF NO TOKEN ---------*/

  return (
    <div className="App">
      {state.loading ?

        <Loader /> :
        <>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='cart' element={<Cart />} />
            <Route path='products' element={<ProductListing />} />
            <Route path='products/:id' element={<ProductDetails />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </>
      }
    </div>
  );
}

export default App;
