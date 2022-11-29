import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {useNavigation } from '@react-navigation/native';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';


const Cabecalho = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={style.cabecalho}> 
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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