import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";


function App() {
      const dispatch = useDispatch()
      useEffect(() => {
          dispatch(loadUser())
      }, [])
      
  
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
        <ProtectedRoute path="/account" exact component={Profile} />
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
