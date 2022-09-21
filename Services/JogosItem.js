import {
    Image,
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native'
import React, { useState, useEffect,  } from 'react'
import {FontAwesome5} from 'react-native-vector-icons';

const jogosItem = ({jogo}) => {
    const nome = jogo.nome
    const imagem = jogo.image
    const preco = jogo.preco
    var estado = jogo.estado

    const seleciona = () => {
        estado = 'check-square'
        console.log('')
    }
    
  return (
    <View style={styles.cartao}>
        <Image style={styles.imagem} source={{uri: imagem}}/>
        <Text>Nome: {nome}</Text>
        <Text>preco: {preco}</Text>
        <FontAwesome5 name={estado} size={40} color="black" onPress={seleciona}/>
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