import {StyleSheet,TouchableOpacity, Text, ImageBackground, View, Image,Linking} from 'react-native'
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const CartaoPc = ({pc}) => {
    const navigation = useNavigation()
    const {pecas, tipo, jogos} = pc
    const cpu = pecas?.[0]
    const gpu = pecas?.[1]
    const ram = pecas?.[2]
    const rom = pecas?.[3]
    let icone
    if (tipo === "Mínima") {
        icone = 'dollar-sign'
    }
    else{
        icone = "chart-line"
    }

    return (
        <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate('Pecas', pc)}>
            <Image style={styles.imagem} source={{uri: 'https://cdn-icons-png.flaticon.com/512/558/558700.png'}}></Image>
            <View style={styles.items}>
                <View style={styles.cabecalho}>
                    <Text style={styles.tipoConfig}>Configuração {'\n'}{tipo}</Text>
                    <FontAwesome5 style={styles.icone} name={icone} size={30} color="black"/>
                </View>
                <Text style={styles.descricao}>
                    {cpu? cpu?.substr(0,20): null} {'\n'}
                    {gpu? gpu?.substr(0,20): null} {'\n'}
                    {ram? ram?.substr(0,20): null} {'\n'}
                    {rom? rom?.substr(0,20): null} {'\n'}
                </Text>
            </View>
        </TouchableOpacity>
     )
}

export default CartaoPc

const styles = StyleSheet.create({
    cartao:{
        backgroundColor: Cores.tertiary,
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth:2,
        marginTop: 10,
        padding: 9,
    },
    imagem:{
        marginTop: 'auto',
        marginBottom: 'auto',
        height: 170,
        width:'40%'
    },
    items:{
        flex: 1
    },
    cabecalho:{
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    tipoConfig:{
        fontWeight: 'bold', 
        fontSize: 20
    },
    icone:{
        paddingTop:3
    },
    descricao:{
        fontSize:13,
        fontWeight: 'bold', 
        width:'100%'
    }
})