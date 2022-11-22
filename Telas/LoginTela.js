import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'


const LoginTela = ({route, navigation }) => {
    const [email, setEmail] = useState('')

    const [senha, setSenha] = useState('')
    
    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={styles.conteudo}>

                <Text style={styles.titulo}>Entrar</Text>

                <Text style={styles.txtCampo}>Email</Text>
                <TextInput
                    onChangeText={(text) => {setEmail(text)}}
                    style={styles.input}
                    placeholder="exemplo@email.com.br"
                />

                <Text style={styles.txtCampo}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="************"
                />

                <TouchableOpacity style={styles.botaoEntrar}>
                    <Text style={styles.txtBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>
                
                <Text style={styles.txtEsqueciSenha} onPress={() => navigation.navigate('Jogos')}>
                    Esqueci a senha!
                </Text>
                <Text style={styles.txtSemCadastro} onPress={() => navigation.navigate('Cadastro')}>
                    Não tenho cadastro ainda.
                </Text>
            </View>
            <Rodape telas={{ anterior: 'Pecas', parametroAnterior: route.params }} />

        </ImageBackground>
    );
}

export default LoginTela;

const styles = StyleSheet.create({
    conteudo:{
        flex: 1,
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop:5,
    },
    titulo: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 30, 
        marginTop: '5%'
    },
    txtCampo: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 25, 
        marginTop: '5%'
    },
    input: {
        padding: 7, 
        fontSize: 20, 
        backgroundColor: 'white', 
        borderRadius: 4
    },
    botaoEntrar:{ 
        padding: 7, 
        marginTop:35,
        marginBottom: 20,
        backgroundColor: 'black',
        color: 'white',
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 7,
    },
    txtBotaoEntrar: { 
        color: 'white', 
        fontSize: 20
    },
    txtEsqueciSenha:{
        color:'white',
        fontWeight: 'bold', 
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 18 
    },
    txtSemCadastro: {
        color: 'white', 
        // textAlign: 'center', 
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 15,
        marginTop:"50%",
    }
})