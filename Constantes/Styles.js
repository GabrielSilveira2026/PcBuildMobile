import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native'

export const imagemFundo = require('../Imagens/FundoMontado.png') ;

export const Cores = {
    //cabecalho e rodape #5865f2
    primary: '#5865f2',

    //fundo #2f3135
    secondary: '#2f3135',

    //cartoes #787ceb
    tertiary: '#787ceb'
}

export default StyleSheet.create({
    // cabecalho:{
    //     backgroundColor: Cores.primary,
    //     marginTop:30, 
    //     height:55, 
    //     paddingTop: 7,  
    //     paddingRight: 15, 
    //     paddingLeft: 15,
    //     flexDirection: 'row', 
    //     justifyContent: 'space-between', 
    //     borderBottomWidth: 2
    // }
    conteudoTela:{
        height: "90%", 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop:5,
        alignItems: 'center'
    },
    
    botaoPadrao:{
        backgroundColor: 'black',
        color: 'white',
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 7,
    },
});