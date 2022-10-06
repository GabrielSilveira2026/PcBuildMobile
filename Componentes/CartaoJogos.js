import {Image, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const CartaoJogos = ({jogo}) => {
    const cart = useCart()
    const id = jogo.id
    const nome = jogo.nome
    const imagem = jogo.imagem
    const preco = jogo.preco
    const [estado, setEstado] = useState("square")

    const mudaEstado = () => {
        if (estado === "square"){
            setEstado('check-square')
            cart.addToCart(jogo)
        }
        else{
            setEstado('square')
            cart.removeToCart(id)
        }
    }

    const ValorPreco = () => {
        if(preco){
            return <Text>Preco: {preco}</Text>
        }
        else{
            return null
        }
    }
    
  return (
    <View style={styles.cartao}>
        <Image style={styles.imagem} source={{uri: imagem}}/>
        <Text>id: {id}</Text>
        <Text>Nome: {nome}</Text>
        <ValorPreco></ValorPreco>
        {/* <Text>Preco: {preco}</Text> */}
        <FontAwesome5 name={estado} size={40} color="black" onPress={mudaEstado}/>
    </View>
  )
}

export default CartaoJogos

const styles = StyleSheet.create({
    cartao:{
        marginBottom: 10,
        backgroundColor: "#ff7e75",
        padding: 10,
        width: "85%",
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius: 8,
        borderWidth:3
    },
    imagem:{
        borderRadius:8,
        borderWidth: 1,
        borderColor:'black',
        height: 150,
        width: "100%",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})