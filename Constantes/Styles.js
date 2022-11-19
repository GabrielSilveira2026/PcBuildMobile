import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
    conteudoTela:{
        flex: 1,
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
    backgroundImage:{
        flex:1,
        height:windowHeight
    }
});