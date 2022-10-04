import React, {createContext, useState, useContext}from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const addToCart = jogo => {
        setCart((old) => ([
            ...old,
            jogo
        ]))
    }
    const removeToCart = id =>{
        let newCart = cart.filter(p => p.id !== id)
        console.log("teste", JSON.stringify(newCart,null,2))
        cart.splice(0, cart.length)
        for (let i = 0; i < newCart.length; i++) {
            cart[i] = newCart[i];
        }
    }
    return(
        <CartContext.Provider value={{cart, addToCart, removeToCart}}>{children}</CartContext.Provider>
    )
}

export const useCart = () =>{
    const cart = useContext(CartContext)
    return cart
}