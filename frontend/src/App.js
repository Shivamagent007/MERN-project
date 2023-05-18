import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { useEffect , useState} from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js"
import Search from "./components/Product/Search.js"
import LoginSignUp from "./components/User/LoginSignUp.js";
import Profile from "./components/User/Profile.js"
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import { loadUser } from "./redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js"
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js"
import ProductList from "./components/Admin/ProductList.js"


import axios from "axios";
import Payment from "./components/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




function App() {
      const dispatch = useDispatch()
      const [stripeApiKey , setStripeApiKey] = useState("")
      async function getStripeApiKey(){
        const { data } = await axios.get("/api/v1/stripeapikey")
        console.log(data)
        setStripeApiKey(data.stripeApiKey)
      }
      const { loading } = useSelector((state) => state.users)
      useEffect(() => {
        dispatch(loadUser())
        getStripeApiKey();
      }, [])
      
      if (loading) {
        return <div>Loading...</div>;
      }
    
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" exact component={ProductDetails} />
        <Route path="/products" exact component={Products} />
        <Route path="/search" exact component={Search} />
        <Route path="/products/:keyword" component={Products} />
        <Route path="/login" exact component={LoginSignUp} />
        <Route path="/update" exact component={UpdateProfile} />
        <Route path="/updatePassword" exact component={UpdatePassword} />
        <Route path="/forgotPassword" exact component={ForgotPassword} />
        <Route path="/password/reset/:token" exact component={ResetPassword} />
        <Route path="/shipping" exact component={Shipping} />
              
        <ProtectedRoute path="/account" exact component={Profile}  />

        <ProtectedRoute path="/order/confirm" exact component={ConfirmOrder}  />

        <Route path="/success" exact component={OrderSuccess} />
        <Route path="/orders" exact component={MyOrders} />
        <Route path="/order/:id" exact component={OrderDetails} />
        <ProtectedRoute path="/admin/dashboard" exact component={Dashboard} />
        <ProtectedRoute path="/admin/products" exact component={ProductList} />


        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute path="/process/payment" exact component={Payment}  />
          </Elements>
        )}
        

        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
