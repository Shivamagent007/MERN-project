import React from 'react'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className=''>
        <Typography>Your Oreder has been Placed successfully </Typography>
        <Link to="/orders"> View Orders </Link>
    </div>
  )
}

export default OrderSuccess