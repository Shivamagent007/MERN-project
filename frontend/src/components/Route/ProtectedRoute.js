import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router ,Redirect, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'
import LoginSignUp from '../User/LoginSignUp'


const ProtectedRoute = ({ component: Component, path, ...rest }) => {
    
    
    const { isAuthenticated } = useSelector((state)=> state.users)
    const redirectPath = path;
    console.log(redirectPath)
    console.log(`isAuth bhai ${isAuthenticated}`)

    //set time out  until loadUser() updates state

  
  return (
    <>    
          <Router >
            <Switch>
              <Route
                {...rest}
                render = {(props) => {
                  // console.log(`user is ${user.user.name}`)

                  if (isAuthenticated === true ) {
                    return <Component {...props} />
                  }
                  console.log("if logged in this should not run")

                  return <LoginSignUp redirectPath = {redirectPath} />
                }}
              />
          </Switch>
        </Router>
    </>
  )
}

export default ProtectedRoute