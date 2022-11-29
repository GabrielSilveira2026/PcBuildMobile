import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground, ScrollView, Alert } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {autenticaUsuario} from '../Services/httpservices'

const LoginTela = ({route, navigation }) => {
    const configSalva = route?.params
    const [email, setEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)

    const logar = async() => {
        let usuarioAutenticado
        try {
            usuarioAutenticado = await autenticaUsuario({email, senha})
        } catch (error) {
            Alert.alert("Erro ao efetuar o autenticar usuario", error)
        }

        if (usuarioAutenticado.status === 201) {
            await AsyncStorage.setItem("@usuario", JSON.parse({usuario: usuarioAutenticado.usuario, tokenjwt:usuarioAutenticado.tokenjwt}))
            configSalva?
                navigation.navigate('Favoritos', configSalva)
            :
                navigation.navigate('Jogos')
        }
        else {
            alert("Erro ao efetuar o login")
        }
    }

    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={stylesGlobal.conteudoTela}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={stylesGlobal.tituloUsuario}>Entrar</Text>

                <Text style={styles.txtCampo}>Email {''}
                </Text>
                <TextInput
                    onChangeText={(text) => {setEmail(text)}}
                    placeholderTextColor="#cccccc"
                    autoCapitalize='none'
                    style={stylesGlobal.input}
                    placeholder="exemplo@email.com.br"
                />

                <Text style={styles.txtCampo}>Senha</Text>
                <View style={stylesGlobal.senhas}>
                    <TextInput
                        onChangeText={(text) => {setSenha(text)}}
                        style={stylesGlobal.input}
                        secureTextEntry={verSenha}
                        autoCapitalize='none'
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                        onSubmitEditing={logar}
                    />
                    <TouchableOpacity style={stylesGlobal.botaoLadoInput} onPress={()=>{verSenha?setVerSenha(false):setVerSenha(true)}}>
                        <FontAwesome5 name={verSenha?'eye':'eye-slash'} size={30} color="white"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesGlobal.botaoUsuario} onPress={logar}>
                    <Text style={stylesGlobal.txtBotaoUsuario}>Entrar</Text>
                </TouchableOpacity>

                <Text style={stylesGlobal.txtLinkSublinhado} onPress={() => navigation.navigate('EsqueciSenha')}>
                    Esqueci a senha!
                </Text>

                <Text style={styles.txtSemCadastro} onPress={() => navigation.navigate('Cadastro')}>
                    Não tenho cadastro ainda.
                </Text>
            </ScrollView> 
            </View>

            <Rodape telas={{ anterior: 'back', parametroAnterior: route.params }} />

        </ImageBackground>
    );
}

export default LoginTela;

const styles = StyleSheet.create({
    txtCampo: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 25, 
        marginTop: '5%'
    },
    txtSemCadastro: {
        color: 'white',
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 18,
        marginTop:"60%",
    }
})