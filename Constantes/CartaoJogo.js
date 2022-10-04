import {
    Image,
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native'
import React from 'react'

export const CartaoJogo = (id,nome,preco) =>{
    return (
        <View style={styles.cartao}>
            <Image style={styles.imagem} source={{uri: imagem}}/>
            <Text>id: {id}</Text>
            <Text>Nome: {nome}</Text>
            <Text>preco: {preco}</Text>
            {/* <FontAwesome5 name={estado} size={40} color="black" onPress={mudaEstado}/> */}
        </View>
      )
}
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