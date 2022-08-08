import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
const image = require('../Imagens/Fundo.png');

export default StyleSheet.create({
    cabecalho:{
        backgroundColor: '#DF3F48', 
        marginTop:30, 
        height:55, 
        paddingTop: 7,  
        paddingRight: 15, 
        paddingLeft: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 2
    },
    
    tela: {
        textAlign: "center",
        justifyContent: "center",
    },
    conteudo: {
        textAlign: "center",
        height: '89.9%',
        backgroundColor: Cores.secondary,
    },
    rodape: {
        padding: 8,
        height: 80,
        width: '100%',
        backgroundColor: Cores.primary,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'flex-end',
    }, 
    botaoProximo:{
        alignItems: "center",
        borderRadius: 7,
        padding:15,
        width: '100%',
        backgroundColor: 'black'
    },
    backgroundImage: {
        width: '100%', 
        height: '94%'
    }
});