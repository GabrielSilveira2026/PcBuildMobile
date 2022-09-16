import {
    Image,
    StyleSheet, 
    Text, 
    View,
} from 'react-native'
import React from 'react'

const jogosItem = ({jogo}) => {
    const name = jogo.name

  return (
    <View style={styles.cartao}>
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
        width: 250,
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius: 8,
        borderWidth:3
    }
})