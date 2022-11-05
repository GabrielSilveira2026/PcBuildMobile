import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {useNavigation } from '@react-navigation/native';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';


const Cabecalho = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={style.cabecalho}> 
            <TouchableOpacity>
                <FontAwesome5 name="bars" size={30} color="white" onPress={() => navigation.navigate('Jogos')}/>
            </TouchableOpacity>
            <Text style={style.logo}>Pc Build Up</Text>
            <FontAwesome5 name="search" size={30} color="white"/>
        </SafeAreaView >
    )
}

export default Cabecalho


const style = StyleSheet.create({
    cabecalho:{
        backgroundColor: Cores.primary, 
        // marginTop:30, 
        height:50, 
        paddingTop: 7,  
        paddingRight: 15, 
        paddingLeft: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 2
    },
    logo:{
        fontSize: 20,
        color: 'white',
    }
});