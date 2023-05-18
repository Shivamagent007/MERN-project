import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { decreaseItem, removeItem } from '../../redux/cartSlice'


const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const total = useSelector(state => state.cart.total)
    console.log(cartItems);
    const dispatch = useDispatch();
    
    function handleDecrease(e, item_id, price) {
        
        dispatch(decreaseItem({ productId: item_id, price: price}))
    }
    function handleRemoveFromCart(e, item_id) {
        console.log(item_id)
        // const productId = e.target.dataset.id
        dispatch(removeItem({ productId: item_id }))
    }

    return (
        <div>
            {cartItems.map(item => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <button onClick={(e) => handleDecrease(e, item._id, item.price)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Decrease
                    </button>
                    <button onClick={(e) => handleRemoveFromCart(e, item._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Remove Item
                    </button>
                </div>
            ))}

            <p>Total: {total}</p>


        </div>
    )
}

export default Cart