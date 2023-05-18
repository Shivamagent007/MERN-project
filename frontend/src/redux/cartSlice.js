import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
        total: JSON.parse(localStorage.getItem('total')) || 0,
        shippingInfo : JSON.parse(localStorage.getItem('shippingInfo') || "{}"),
    },
    reducers: {
        addItem(state, action) {
            const item = action.payload.product;
            const quantity = action.payload.quantity;
            const isItemExist = state.cartItems.find(cartItem => cartItem._id === item._id);
            if (isItemExist) {
                const newCartItems = state.cartItems.map(cartItem=>
                    cartItem._id === item._id ? {...cartItem, quantity: cartItem.quantity + quantity } : cartItem
                    )
                const newTotal = state.total + (item.price * quantity)
                console.log("owlwlwl")
                updateLocalStorage(newCartItems,newTotal)
                return {
                    ...state,
                    cartItems: newCartItems,
                    total : newTotal,
                }
            } else {
                const newCartItems = [...state.cartItems,{...item, quantity: quantity}]
                const newTotal = state.total + (item.price * quantity)
                console.log('osho')
                updateLocalStorage(newCartItems,newTotal)
                
                return {
                    ...state,
                    cartItems: newCartItems,
                    total : newTotal,
                }
            }

        },
        decreaseItem(state, action){
            const product = action.payload;
            const isItemExist = state.cartItems.find(cartItem => cartItem._id === product.productId);
            console.log(product.price)
            if (isItemExist.quantity === 1) {
                const newCartItems = state.cartItems.filter(cartItem => cartItem._id !== product.productId)
                const newTotal = state.total - (product.price)
                updateLocalStorage(newCartItems,newTotal)

                return {
                    ...state,
                    cartItems : newCartItems,
                    total : newTotal,
                }
            } else {
                const newCartItems = state.cartItems.map( 
                    cartItem => cartItem._id === product.productId ? {...cartItem, quantity: cartItem.quantity -1}: cartItem
                    )
                const newTotal = state.total - (product.price)

                updateLocalStorage(newCartItems,newTotal)

                return {
                    ...state,
                    cartItems: newCartItems,
                    total : newTotal,
                }
            }
           
        },
        removeItem(state, action){
            const product = action.payload
            console.log(product.productId)
            const existingItem = state.cartItems.find(cartItem => cartItem._id === product.productId);
            
            const newCartItems = state.cartItems.filter(cartItem => cartItem._id !== product.productId)
            const newTotal = state.total - (existingItem.price * existingItem.quantity)

            updateLocalStorage(newCartItems,newTotal)
            
            return {
                ...state,
                cartItems: newCartItems,
                total: newTotal,
            };
        },
        clearCart(state) {
            const newCartItems = []
            const newTotal = 0

            updateLocalStorage(newCartItems,newTotal)

            return {
                ...state,
                cartItems: newCartItems,
                total: newTotal,
            };
        },
        saveShippingInfo(state, action){
            const shippingInfo = action.payload
            
            localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo))
            return {
                ...state,
                shippingInfo: shippingInfo,
            }
        }
    }
})

function updateLocalStorage(cartItems, total) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    localStorage.setItem('total',JSON.stringify(total))
}

export const {addItem, removeItem , decreaseItem, clearCart, saveShippingInfo } = cartSlice.actions
export default cartSlice.reducer