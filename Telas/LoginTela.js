import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground, ScrollView } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import {validaSenha, validaEmail} from '../Services/httpservices'


const LoginTela = ({route, navigation }) => {
    const [email, setEmail] = useState('')
    const [estadoEmail, setEstadoEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)
    const [estadoSenha, setEstadoSenha] = useState('')
    
    console.log(JSON.stringify(route.params,0,2));
    const logar = () => {

    }

    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={stylesGlobal.conteudoTela}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={stylesGlobal.tituloUsuario}>Entrar</Text>

                <Text style={styles.txtCampo}>Email {''}
                {
                    estadoEmail === true?
                        <FontAwesome5 name={'check'} size={25} color={Cores.primary} />
                        :
                        estadoEmail === false?
                            <FontAwesome5 name={'times'} size={25} color={'red'} />
                            :
                            null
                }
                </Text>
                <TextInput
                    onChangeText={(text) => {setEmail(text)}}
                    //onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
                    placeholderTextColor="#cccccc"
                    autoCapitalize='none'
                    style={stylesGlobal.input}
                    placeholder="exemplo@email.com.br"
                />

                <Text style={styles.txtCampo}>Senha</Text>
                <View style={stylesGlobal.senhas}>
                    <TextInput
                        onChangeText={(text) => {setSenha(text)}}
                        // onEndEditing={()=>{setEstadoSenha(validaSenha(senha))}}
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