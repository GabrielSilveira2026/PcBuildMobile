import React from 'react';
import {Cores} from '../Constantes/Styles'
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity, Text, View, StyleSheet,Dimensions, Alert} from 'react-native';
import {useCart} from '../Constantes/CartContext'

const Rodape = ({telas}) => {
    const selecionados = useCart()
    const navigation = useNavigation()
    const {txtProxima, proxima, txtAnterior, anterior, parametroAnterior, parametroProxima} = telas
    return (
        <View style={style.rodape}>
            {
                anterior?
                    <TouchableOpacity
                        style={style.botaoVoltar}
                        onPress={() => anterior==='back'?navigation.goBack() :navigation.navigate(anterior, parametroAnterior)}
                    >    
                        <Text style={{ color: 'black' }}>{txtAnterior?txtAnterior:'Voltar'}</Text>
                    </TouchableOpacity>
                :
                    null
            }
            {
                proxima?
                    <TouchableOpacity
                        style={style.botaoProximo}
                        // disabled={selecionados.cart.length === 0}
                        onPress={() => {selecionados.cart.length > 0? navigation.navigate(proxima, parametroProxima):Alert.alert("Nenhum jogo selecionado","Por favor, selecione um jogo")}}
                    >    
                        <Text style={{ color: 'white' }}>{txtProxima?txtProxima:'Próximo'}</Text>
                    </TouchableOpacity>
                :
                    null
            }
        </View>
    )
}

export default Rodape

const style = StyleSheet.create({
    rodape: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        padding: 12,
        height: Dimensions.get('window').height*9/100,
        backgroundColor: Cores.primary,
        borderTopWidth: 2,
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
})