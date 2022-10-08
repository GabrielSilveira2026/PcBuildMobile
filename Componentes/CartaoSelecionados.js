import {Image, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const CartaoSelecionados = ({jogo}) => {
    const cart = useCart()
    const id = jogo.id
    const nome = jogo.nome
    const imagem = jogo.imagem
    const preco = jogo.preco
    const [estado, setEstado] = useState("toggle-on")

    const mudaEstado = () => {
        setEstado('toggle-off')
        cart.removeToCart(id)
    }
    
    const ValorPreco = () => {
        if(preco) return <Text>Preco: {preco}</Text>
        else return null
    }
    
  return (
    <View style={styles.cartao}>

        <FontAwesome5 style={{marginLeft: "82%"}} name={estado} size={50} color="black" onPress={mudaEstado}/>
        <Image style={styles.imagem} source={{uri: imagem}}/>
        <Text>id: {id}</Text>
        <Text>Nome: {nome}</Text>
        <ValorPreco></ValorPreco>
        {/* <Text>Preco: {preco  ?? "Indisponível" }</Text> */}
        
    </View>
  )
}

export default CartaoSelecionados

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