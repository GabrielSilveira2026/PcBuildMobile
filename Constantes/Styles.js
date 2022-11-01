import {StyleSheet} from 'react-native';
const image = require('../Imagens/Fundo.png');

export const Cores = {
    primary: '#DF3F48',
    secondary: '#DF676B'
}

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