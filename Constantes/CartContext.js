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
        setCart()
        setCart(newCart)
    }
    return(
        <CartContext.Provider value={{cart, addToCart, removeToCart}}>{children}</CartContext.Provider>
    )
}

export const useCart = () =>{
    const cart = useContext(CartContext)
    return cart
}