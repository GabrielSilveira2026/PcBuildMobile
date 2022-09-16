import {
    Image,
    StyleSheet, 
    Text, 
    View,
} from 'react-native'
import React from 'react'

const jogosItem = ({jogo}) => {
    const name = jogo.name
    const imagem = jogo.image
  return (
    <View style={styles.cartao}>
        <Image style={styles.imagem} source={{uri: imagem}}/>
        <Text>Nome: {name}</Text>
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