import React, {useState} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground, ScrollView } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';


const LoginTela = ({route, navigation }) => {
    const [email, setEmail] = useState('')
    const [estadoEmail, setEstadoEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)
    const [estadoSenha, setEstadoSenha] = useState('')
    
    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={stylesGlobal.conteudoTela}>
            <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={styles.titulo}>Entrar</Text>

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
                    style={styles.input}
                    placeholder="exemplo@email.com.br"
                />

                <Text style={styles.txtCampo}>Senha</Text>
                <View style={styles.senhas}>
                    <TextInput
                        onChangeText={(text) => {setSenha(text)}}
                        // onEndEditing={()=>{setEstadoSenha(validaSenha(senha))}}
                        style={styles.input}
                        secureTextEntry={verSenha}
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                    />
                    <TouchableOpacity style={styles.vizualizarSenha} onPress={()=>{verSenha?setVerSenha(false):setVerSenha(true)}}>
                        <FontAwesome5 name={verSenha?'eye':'eye-slash'} size={30} color="white"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.botaoEntrar}>
                    <Text style={styles.txtBotaoEntrar}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.txtEsqueciSenha} onPress={() => navigation.navigate('EsqueciSenha')}>
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
        fontSize: 20, 
        padding:5,
        flexGrow:1,
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    vizualizarSenha:{
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    senhas:{
        flex:1, 
        flexDirection: 'row',
        width: '100%'
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
        textDecorationLine: 'underline', 
        fontWeight: 'bold', 
        fontSize: 18,
        marginTop:"60%",
    }
})