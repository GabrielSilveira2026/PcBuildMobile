import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground,Alert, ScrollView } from 'react-native';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import {validaSenha, validaEmail} from '../Services/httpservices'
import axios from 'axios'

const CadastroTela = ({navigation}) => {
    const [nome, setNome] = useState('')

    const [email, setEmail] = useState('')
    const [estadoEmail, setEstadoEmail] = useState('')

    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(true)
    const [estadoSenha, setEstadoSenha] = useState('')

    const [confirmaSenha, setConfirmaSenha] = useState('')
    const [verConfirmaSenha, setVerConfirmaSenha] = useState(true)
    const [estadoConfirmaSenha, setEstadoConfirmaSenha] = useState(true)

    function cadastra(){
        setEstadoEmail(validaEmail(email))
        setEstadoSenha(validaSenha(senha))
        setEstadoConfirmaSenha(confirmaSenha === senha)
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
            <View style={styles.conteudo}>
                <ScrollView>
                <Text style={styles.titulo}>Criar conta</Text>

                <Text style={styles.txtCampo}>Nome de Usuário</Text>
                <TextInput
                    onChangeText={(text) => {setNome(text)}}
                    style={styles.input}
                    placeholderTextColor="#cccccc"
                    placeholder="Usuário exemplo"
                />

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
                    onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
                    style={styles.input}
                    placeholder="exemplo@email.com.br"
                    placeholderTextColor="#cccccc"
                />

                <Text style={styles.txtCampo}>Senha {''}
                    {
                        estadoSenha === true ?
                            <FontAwesome5 name={'check'} size={25} color={Cores.primary} />
                            :
                            estadoSenha === false ?
                                <FontAwesome5 name={'times'} size={25} color={'red'} />
                                :
                                null
                    }
                </Text>
                    <View style={{flex:1, flexDirection: 'row', width: '100%'}}>
                        <TextInput
                            onChangeText={(text) => {setSenha(text)}}
                            onEndEditing={()=>{setEstadoSenha(validaSenha(senha))}}
                            style={styles.input}
                            secureTextEntry={verSenha}
                            placeholderTextColor="#cccccc"
                            placeholder="************"
                        />
                        <FontAwesome5 style={styles.vizualizarSenha} name={verSenha?'eye':'eye-slash'} size={30} color="white" onPress={()=>{verSenha?setVerSenha(false):setVerSenha(true)}}/>
                    </View>
                <Text style={{color:'white',fontSize:15}}>(Mínimo de 6 dígitos, 1 letra maiúscula, 1 letra minúscula, 1 número)</Text>

                <Text style={styles.txtCampo}>Confirme a Senha {''}
                    {
                        estadoConfirmaSenha === true ?
                            <FontAwesome5 name={'check'} size={25} color={Cores.primary} />
                            :
                            estadoConfirmaSenha === false ?
                                <FontAwesome5 name={'times'} size={25} color={'red'} />
                                :
                                null
                    }
                </Text>
                <View style={{flex:1, flexDirection: 'row', width: '100%'}}>
                    <TextInput
                        onChangeText={(text) => {setConfirmaSenha(text)}}
                        onEndEditing={()=>{setEstadoConfirmaSenha(confirmaSenha === senha && validaSenha(confirmaSenha))}}
                        secureTextEntry={verConfirmaSenha}
                        style={styles.input}
                        placeholderTextColor="#cccccc"
                        placeholder="************"
                    />
                    <FontAwesome5 style={styles.vizualizarSenha} name={verConfirmaSenha?'eye':'eye-slash'} size={30} color="white" onPress={()=>{verConfirmaSenha?setVerConfirmaSenha(false):setVerConfirmaSenha(true)}}/>
                </View>

                <TouchableOpacity style={styles.botaoEntrar} onPress={cadastra}>
                    <Text style={styles.txtBotaoEntrar}>Criar</Text>
                </TouchableOpacity>
                <Text style={styles.txtPossuiConta} onPress={() => navigation.navigate('Login')}>
                    Já possuo uma conta!
                </Text>
                </ScrollView>
            </View>
            <Rodape telas={{ anterior: 'Pecas'}} />

        </ImageBackground>
    );
}

export default CadastroTela;

const styles = StyleSheet.create({
    conteudo:{
        flex: 1,
        paddingLeft: 13, 
        paddingRight: 13, 
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
    botaoEntrar:{ 
        padding: 7, 
        marginTop: 25,
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
    txtPossuiConta:{
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
        fontSize: 15,
    }
})