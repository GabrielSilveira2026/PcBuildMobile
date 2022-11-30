import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground,Alert, ScrollView, Keyboard} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import {validaSenha, validaEmail, validaNome, cadastraUsuario} from '../Services/httpservices'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Estado =({estado, texto}) => {
    return (
        <Text style={styles.txtCampo}>{texto} {''}
            {
                estado?
                    <FontAwesome5 name={'check'} size={25} color={Cores.primary} />
                    :
                    estado === false?
                        <FontAwesome5 name={'times'} size={25} color={'red'} />
                        :
                        null
            }
        </Text>
    )
}



const CadastroTela = ({route, navigation}) => {
    const configSalva = route?.params

    const [nome, setNome] = useState('')
    const [estadoNome, setEstadoNome] = useState('')

    const [email, setEmail] = useState('')
    const [estadoEmail, setEstadoEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)
    const [estadoSenha, setEstadoSenha] = useState('')

    const [confirmaSenha, setConfirmaSenha] = useState('')
    const [verConfirmaSenha, setVerConfirmaSenha] = useState(true)
    const [estadoConfirmaSenha, setEstadoConfirmaSenha] = useState()

    async function cadastra(){
        setEstadoNome(validaNome(nome))
        setEstadoEmail(validaEmail(email))
        setEstadoSenha(validaSenha(senha))
        setEstadoConfirmaSenha(confirmaSenha === senha && validaSenha(confirmaSenha))

        if(estadoEmail && estadoSenha && confirmaSenha === senha && estadoNome) {
            let cadastro
            try {
                cadastro = await cadastraUsuario({nome, email, senha})
            } 
            catch (erro) {
            }

            if (cadastro) {
                navigation.navigate('Login', configSalva)
            }
            else{
                Alert.alert('Erro ao cadastrar', 'E-mail já cadastrado')
            }
        }
    }

    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={stylesGlobal.conteudoTela}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={stylesGlobal.tituloUsuario}>Cadastrar</Text>

                <Estado estado={estadoNome} texto={'Nome de Usuário'}/>
                <TextInput
                    onChangeText={(text) => {setNome(text)}}
                    onEndEditing={() =>{setEstadoNome(validaNome(nome))}}
                    style={stylesGlobal.input}
                    placeholderTextColor="#cccccc"
                    placeholder="Usuário exemplo"
                />

                <Estado estado={estadoEmail} texto={'Email'}/>
                <TextInput
                    onChangeText={(text) => {setEmail(text)}}
                    onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
                    autoCapitalize='none'
                    style={stylesGlobal.input}
                    placeholder="exemplo@email.com.br"
                    placeholderTextColor="#cccccc"
                />
                
                <Estado estado={estadoSenha} texto={'Senha'}/>
                <View style={stylesGlobal.senhas}>
                    <TextInput
                        onChangeText={(text) => {setSenha(text)}}
                        onEndEditing={()=>{setEstadoSenha(validaSenha(senha))}}
                        style={stylesGlobal.input}
                        autoCapitalize='none'
                        secureTextEntry={verSenha}
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                    />
                    <TouchableOpacity style={stylesGlobal.botaoLadoInput} onPress={()=>{verSenha?setVerSenha(false):setVerSenha(true)}}>
                        <FontAwesome5 name={verSenha?'eye':'eye-slash'} size={30} color="white"/>
                    </TouchableOpacity>
                </View>
                <Text style={{color:'white',fontSize:15}}>(Mínimo de 6 dígitos, 1 letra maiúscula, 1 letra minúscula, 1 número)</Text>

                <Estado estado={estadoConfirmaSenha} texto={'Confirme a Senha'}/>
                <View style={stylesGlobal.senhas}>
                    <TextInput
                        onChangeText={(text) => {setConfirmaSenha(text)}}
                        onEndEditing={()=>{setEstadoConfirmaSenha(confirmaSenha === senha && validaSenha(confirmaSenha))}}
                        secureTextEntry={verConfirmaSenha}
                        autoCapitalize='none'
                        style={stylesGlobal.input}
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                        onSubmitEditing={cadastra}
                    />
                    <TouchableOpacity style={stylesGlobal.botaoLadoInput} onPress={()=>{verConfirmaSenha?setVerConfirmaSenha(false):setVerConfirmaSenha(true)}}>
                        <FontAwesome5 name={verConfirmaSenha?'eye':'eye-slash'} size={30} color="white"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesGlobal.botaoUsuario} onPress={cadastra}>
                    <Text style={stylesGlobal.txtBotaoUsuario}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={stylesGlobal.txtLinkSublinhado} onPress={() => navigation.navigate('Login', configSalva)}>
                    Já possuo uma conta!
                </Text>

                </ScrollView>
            </View>
            <Rodape telas={{ anterior: 'back'}} />

        </ImageBackground>
    );
}

export default CadastroTela;

const styles = StyleSheet.create({
    txtCampo: {
        fontWeight: 'bold', 
        color: 'white', 
        fontSize: 22, 
        marginTop: '5%'
    },
})