import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {useNavigation } from '@react-navigation/native';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cabecalho = () => {
    const navigation = useNavigation()
    let tokenUsuario

    const usuario = async() => {
        try {
            tokenUsuario = await AsyncStorage.getItem("@tokenUsuario")
        } catch (error) {
            Alert.alert("Ocorreu um erro")
        }
        
        if (tokenUsuario) {
            let statusToken = await validaToken(tokenUsuario)
            if (statusToken.status === 200) {
                navigation.navigate('Perfil')
            }
            else if(statusToken.status === 404){
                Alert.alert("Sessão inspirada", "Por favor faça o login novamente.")
                navigation.navigate('Login')
            }
            else{
                Alert.alert("Ocorreu um erro ao Salvar sua configuração")
            }
          }
        else{
        navigation.navigate('Login')
        }
    }

    return (
        <SafeAreaView style={style.cabecalho}> 
            <TouchableOpacity onPress={usuario}>
                <FontAwesome5 name="user" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Jogos')}>
                <Text style={style.logo}>Pc Build</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                <FontAwesome5 name="star" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export default Cabecalho


const style = StyleSheet.create({
    cabecalho:{
        backgroundColor: Cores.primary, 
        height:50,
        alignItems: "center", 
        paddingRight: 15, 
        paddingLeft: 15,
        flexDirection: 'row',
        borderBottomWidth: 2,
        justifyContent: 'space-between'
    },
    logo:{
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
    }
});