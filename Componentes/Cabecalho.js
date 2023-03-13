import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView,View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validaToken} from '../Services/httpservices'


const Cabecalho = () => {
    const navigation = useNavigation()
    const route = useRoute()
    console.log(route);
    let progresso
    if (route.name === "Jogos") {
        progresso = '30%'
    }
    else if (route.name === "Selecionados"){
        progresso = '50%'
    }
    else if (route.name === "Filtros"){
        progresso = '80%'
    }
    else if (route.name === "Recomendados"){
        progresso = '95%'
    }

    let usuario

    const redirecionadUsuario = async() => {
        try {
            usuario = JSON.parse(await AsyncStorage.getItem("@usuario"))
        } catch (error) {
            Alert.alert("Ocorreu um erro")
        }
        
        if (usuario) {
            let statusToken
            try {
                statusToken = await validaToken(usuario.tokenjwt)
            }
            catch (error) {
                
            }

            if (statusToken) {
                navigation.navigate('Perfil')
            }
            else{
                Alert.alert("Sessão inspirada", "Por favor faça o login novamente.")
                navigation.navigate('Login')
            }
          }
        else{
            navigation.navigate('Login')
        }
    }

    return (
        <>
            <SafeAreaView style={style.cabecalho}> 
                <TouchableOpacity onPress={redirecionadUsuario}>
                    <FontAwesome5 name="user" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Jogos')}>
                    <Text style={style.logo}>Pc Build</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}>
                    <FontAwesome5 name="star" size={30} color="white" />
                </TouchableOpacity>
            </SafeAreaView >
            <View style={{backgroundColor: 'black', height: 4, width: progresso}}></View>
        </>
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