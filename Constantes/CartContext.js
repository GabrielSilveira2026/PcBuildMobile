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
    const removeToCart = id_jogo_steam =>{
        let newCart = cart.filter(p => p.id_jogo_steam !== id_jogo_steam)
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