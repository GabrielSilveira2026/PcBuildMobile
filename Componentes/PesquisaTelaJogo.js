import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'

const PesquisaTelaJogo = ({jogo}) => {
    const selecionados = useCart()
    return (
        <>
            <Text style={styles.titulo}>Selecione até {5 - selecionados.cart.length} jogos que você deseja jogar!</Text>

            <View style={styles.pesquisa}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o jogo"
                    placeholderTextColor="#cccccc"
                    value={jogo}
                    onChangeText={capturarJogo}
                    onSubmitEditing={pesquisa}
                />
                <TouchableOpacity
                    onPress={pesquisa}
                >
                    <FontAwesome5 style={styles.botaoPesquisa} name="search" size={30} color="white" />
                </TouchableOpacity>

            </View>
        </>
    )
}

export default PesquisaTelaJogo

const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
        marginBottom: 15
    },
    pesquisa: {
        flexDirection: 'row',
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 5,
    },
    input: {
        flexGrow: 1,
        color: 'white',
        fontSize: 25,
        borderBottomWidth: 1,
        marginBottom: 10,
        borderColor: 'white'
    },
    botaoPesquisa: {
        width: 'auto',
        backgroundColor: 'black',
        alignItems: 'center',
        borderRadius: 7,
        padding: 10,
        marginLeft: 5,
        marginBottom: 10
    }
})