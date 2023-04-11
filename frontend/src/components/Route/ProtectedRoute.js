import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.users)  
  return (
    <>
        {!loading && (
            <Route
               {...rest}
               render = {(props) => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />
                }

                return <Component {...props} />
               }}
            />
        )}
    </>
  )
}

export default ProtectedRoute