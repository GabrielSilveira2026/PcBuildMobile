import {StyleSheet} from 'react-native';

export const imagemFundo = require('../Imagens/Fundo.png') ;

export const Cores = {
    primary: '#e7583f', //cabeçalho e rodapé
    secondary: '#2f3135', //fundo
    tertiary: '#ea6a54' //cartoes
}

export default StyleSheet.create({
    cabecalho:{
        backgroundColor: Cores.primary, 
        marginTop:30, 
        height:55, 
        paddingTop: 7,  
        paddingRight: 15, 
        paddingLeft: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 2
    },
    rodape: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        padding: 12,
        height: '10%',
        width: '100%',
        backgroundColor: Cores.primary,
        borderTopWidth: 2,
        position: 'absolute', 
        bottom: 0
    }, 
    botaoVoltar:{
        flexGrow: 1,
        marginRight: 5,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        borderWidth: 1,
    },
    botaoProximo:{
        flexGrow: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 7,
    },
});