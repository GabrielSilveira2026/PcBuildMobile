import React, {createContext, useState, useContext, useEffect}from 'react'

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const addToCart = jogo => {
        setCart(old => ({
            ...old,
            [jogo.nome]: jogo
        }))
    }
    return(
        <CartContext.Provider value={{cart, addToCart}}>{children}</CartContext.Provider>
    )
}


