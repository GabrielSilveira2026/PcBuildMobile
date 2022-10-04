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
    return(
        <CartContext.Provider value={{cart, addToCart}}>{children}</CartContext.Provider>
    )
}

export const useCart = () =>{
    const cart = useContext(CartContext)
    return cart
}