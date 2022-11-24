import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground,Alert, ScrollView, Keyboard} from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import {validaSenha, validaEmail} from '../Services/httpservices'
import axios from 'axios'

export const Estado =({estado, texto}) => {
    return (
        <Text style={styles.txtCampo}>{texto} {''}
            {
                estado === true ?
                    <FontAwesome5 name={'check'} size={25} color={Cores.primary} />
                    :
                    estado === false ?
                        <FontAwesome5 name={'times'} size={25} color={'red'} />
                        :
                        null
            }
        </Text>
    )
}

const CadastroTela = ({navigation}) => {
    const [nome, setNome] = useState('')

    const [email, setEmail] = useState('')
    const [estadoEmail, setEstadoEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)
    const [estadoSenha, setEstadoSenha] = useState('')

    const [confirmaSenha, setConfirmaSenha] = useState('')
    const [verConfirmaSenha, setVerConfirmaSenha] = useState(true)
    const [estadoConfirmaSenha, setEstadoConfirmaSenha] = useState()

    function cadastra(){
        setEstadoEmail(validaEmail(email))
        setEstadoSenha(validaSenha(senha))
        setEstadoConfirmaSenha(confirmaSenha === senha && validaSenha(confirmaSenha))
        if(estadoEmail === true && estadoSenha === true && confirmaSenha === senha) {
            let usuario = {nome, email, senha}
            console.log(usuario);

            //axios post 
        }
        else{
            console.log('Invalido');
            // alert erro
        }
    }

    return (
        <ImageBackground source={imagemFundo} resizeMode="stretch" backgroundColor={Cores.secondary} style={stylesGlobal.backgroundImage}>
            <View style={stylesGlobal.conteudoTela}>
                <ScrollView keyboardShouldPersistTaps='handled'>
                <Text style={stylesGlobal.tituloUsuario}>Cadastrar</Text>

                <Text style={styles.txtCampo}>Nome de Usuário</Text>
                <TextInput
                    onChangeText={(text) => {setNome(text)}}
                    style={stylesGlobal.input}
                    placeholderTextColor="#cccccc"
                    placeholder="Usuário exemplo"
                />

                <Estado estado={estadoEmail} texto={'Email'}/>
                <TextInput
                    onChangeText={(text) => {setEmail(text)}}
                    onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
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
                        style={stylesGlobal.input}
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                    />
                    <TouchableOpacity style={stylesGlobal.botaoLadoInput} onPress={()=>{verConfirmaSenha?setVerConfirmaSenha(false):setVerConfirmaSenha(true)}}>
                        <FontAwesome5 name={verConfirmaSenha?'eye':'eye-slash'} size={30} color="white"/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesGlobal.botaoUsuario} onPress={cadastra}>
                    <Text style={stylesGlobal.txtBotaoUsuario}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={stylesGlobal.txtLinkSublinhado} onPress={() => navigation.navigate('Login')}>
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