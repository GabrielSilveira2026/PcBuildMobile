import * as React from 'react';
import { SafeAreaView, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles from '../Constantes/Styles'
import { Feather } from 'react-native-vector-icons';

const image = require('../Imagens/Fundo.png');

const LoginTela = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.tela}>
            {/* Conteudo da Tela */}
            <View style={styles.conteudo}>
                <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
                    <View style={{ marginBottom: 10 , paddingLeft:15, paddingRight:15}}>
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 30, marginTop: '10%'}}>Entrar</Text>

                        <Text style={stylesL.titulo}>Email</Text>
                        <TextInput
                            style={{padding: 7, fontSize: 20, backgroundColor: 'white', borderRadius: 4}}
                            placeholder="exemplo@email.com.br"
                        />

                        <Text style={stylesL.titulo}>Senha</Text>
                        <TextInput
                            style={stylesL.input}
                            placeholder="************"
                        />

                        <TouchableOpacity
                            style={[styles.botaoProximo, {padding: 7, marginTop: '8%'}]}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>Entrar</Text>
                        </TouchableOpacity>
                        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold', color: 'black', fontSize: 15, marginTop: '1%'}}>
                            <Text style={{color: 'black'}} onPress={() => navigation.navigate('Jogos')}>
                            Esqueci a senha!
                            </Text>
                        </Text>


                    </View>
                        <Text style={{marginLeft:'3%',position: 'absolute', bottom: 0,fontWeight: 'bold', color: 'black', fontSize: 15}} onPress={() => navigation.navigate('Jogos')}>
                            Não tem uma conta ainda? cadastre-se aqui
                        </Text>

                </ImageBackground>
            </View>
            {/* Rodapé com botões */}
            <View style={styles.rodape}>
                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('Selecionados')}
                >
                    <Text style={{ color: 'black', fontSize: 20 }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default LoginTela;

const stylesL = StyleSheet.create({
    titulo: {
        fontWeight: 'bold', 
        color: 'black', 
        fontSize: 25, 
        marginTop: '5%'
    },
    input: {
        padding: 7, 
        fontSize: 20, 
        backgroundColor: 'white', 
        borderRadius: 4
    }
})