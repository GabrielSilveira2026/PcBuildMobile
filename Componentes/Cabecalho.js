import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import {useNavigation } from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesome5} from 'react-native-vector-icons';


const Cabecalho = () => {
    const navigation = useNavigation()
    return (
        <View style={style.cabecalho}> 
            <FontAwesome5 name="bars" size={30} color="white" onPress={() => navigation.navigate('Jogos')}/>
            <Text style={style.logo}>Pc Build Up</Text>
            <FontAwesome5 name="search" size={30} color="white"/>
        </View >
    )
}

export default Cabecalho


const style = StyleSheet.create({
    cabecalho:{
        backgroundColor: Cores.primary, 
        marginTop:30, 
        height:45, 
        paddingTop: 7,  
        paddingRight: 15, 
        paddingLeft: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 2
    },
    logo:{
        fontSize: 22,
        color: 'white'
    }
});