import React from 'react';
import styles, {Cores} from '../Constantes/Styles'
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const Rodape = ({telas}) => {
    const navigation = useNavigation()
    const {proxima, anterior} = telas
    return (
        <View style={style.rodape}>
            {
                anterior?
                    <TouchableOpacity
                        style={style.botaoVoltar}
                        onPress={() => navigation.navigate(anterior)}
                    >    
                        <Text style={{ color: 'black' }}>Voltar</Text>
                    </TouchableOpacity>
                :
                    null
            }
            {
                proxima?
                    <TouchableOpacity
                        style={style.botaoProximo}
                        onPress={() => navigation.navigate(proxima)}
                    >    
                        <Text style={{ color: 'white' }}>Proximo</Text>
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
        height: '10%',
        width: '100%',
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