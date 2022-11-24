import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const imagemFundo = require('../Imagens/FundoMontado.png') ;

export const Cores = {
    //cabecalho e rodape #5865f2
    primary: '#665AF4',

    //fundo #2f3135
    secondary: '#2f3135',

    //cartoes #787ceb
    tertiary: '#9882E5'
}

export default StyleSheet.create({
    conteudoTela:{
        flex: 1,
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop:5,
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
    },

    //STYLES PARA AREAS USUARIO

    input: {
        fontSize: 20, 
        padding:5,
        flexGrow:1,
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    senhas:{
        flex:1, 
        flexDirection: 'row',
        width: '100%'
    },
    botaoUsuario:{ 
        padding: 7, 
        marginTop: 25,
        marginBottom: 20, 
        backgroundColor: 'black',
        color: 'white',
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 7,
    },
    txtBotaoUsuario: { 
        color: 'white', 
        fontSize: 20 
    },
    tituloUsuario: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 30, 
        marginTop: '5%'
    },
    txtLinkSublinhado:{
        color:'white',
        fontWeight: 'bold', 
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 18
    },
    botaoLadoInput:{
        borderBottomWidth: 1,
        borderColor: 'white',
    },
});