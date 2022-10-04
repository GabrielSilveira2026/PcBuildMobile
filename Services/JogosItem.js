import {
    Image,
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const jogosItem = ({jogo}) => {
    const cart = useCart()
    const id = jogo.id
    const nome = jogo.nome
    const imagem = jogo.image
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
        // console.log("lista antiga", listaSelecionados)
    }
    
  return (
    <View style={styles.cartao}>
        <Image style={styles.imagem} source={{uri: imagem}}/>
        <Text>id: {id}</Text>
        <Text>Nome: {nome}</Text>
        <Text>preco: {preco}</Text>
        <FontAwesome5 name={estado} size={40} color="black" onPress={mudaEstado}/>
    </View>
  )
}

export default jogosItem

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