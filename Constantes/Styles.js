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
    
    backgroundImage: {
        width: '100%', 
        height: '96%'
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
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        padding: 8,
        height: 80,
        width: '100%',
        backgroundColor: Cores.primary,
        borderWidth: 2,
        borderRadius: 5,
    }, 
    botaoVoltar:{
        alignItems: "center",
        borderRadius: 7,
        padding: 18,
        flexGrow: 1,
        backgroundColor: 'white',
        marginRight: 5
    },
    botaoProximo:{
        alignItems: "center",
        borderRadius: 7,
        padding: 18,
        flexGrow: 1,
        backgroundColor: 'black'
    },
    
});