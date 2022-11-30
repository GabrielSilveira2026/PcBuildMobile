import React, {useEffect, useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput,StyleSheet, Text, View, ImageBackground, TouchableOpacity,ScrollView, Alert} from 'react-native';
import Rodape from '../Componentes/Rodape'
import {FontAwesome5} from 'react-native-vector-icons';
import { Estado } from './CadastroTela';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validaSenha, validaEmail} from '../Services/httpservices'


const PerfilTela = ({navigation}) => {
  const [nome, setNome] = useState('')

  const [email, setEmail] = useState('')
  const [estadoEmail, setEstadoEmail] = useState('')

  const [senha, setSenha] = useState('')
  const [verSenha, setVerSenha] = useState(true)
  const [estadoSenha, setEstadoSenha] = useState('')

  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [verConfirmaSenha, setVerConfirmaSenha] = useState(true)
  const [estadoConfirmaSenha, setEstadoConfirmaSenha] = useState()

  useEffect(()=>{
    async function validaEstadoUsuario(){
      try {
        usuario = JSON.parse(await AsyncStorage.getItem("@usuario"))
      } catch (error) {
        Alert.alert("Ocorreu um erro ao recuperar sua configuração")
      }
      if(usuario) {
        setNome(usuario?.usuario?.nome)
        setEmail(usuario?.usuario?.email)
        setSenha(usuario?.usuario?.email)
      }
      else{
        navigation.navigate('Jogos')
      }
    }
    validaEstadoUsuario()
  },[])
  
  const logout = () => {
    Alert.alert('Sair?','Deseja realmente sair?',[
      {  
        text: 'Cancelar'
      },
      {  
        text: 'Sim',
        onPress: (async()=> {
          await AsyncStorage.setItem("@usuario", '')
          navigation.navigate('Jogos')
        })
      }
    ])
  }
  
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <FontAwesome5 style={{textAlign: 'center', margin: 15}} name="user" size={100} color="white" />

        <Text style={styles.titulo}>Olá, {nome?nome:'Usuário'}</Text>

        <Text style={styles.txtCampo}>Nome de Usuário</Text>
          <TextInput
              onChangeText={(text) => {setNome(text)}}
              style={stylesGlobal.input}
              placeholderTextColor="#cccccc"
              placeholder="Usuário exemplo"
              value={nome}
          />

          <Estado estado={estadoEmail} texto={'Email'}/>
          <TextInput
              onChangeText={(text) => {setEmail(text)}}
              onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
              style={stylesGlobal.input}
              placeholder="exemplo@email.com.br"
              placeholderTextColor="#cccccc"
              value={email}
          />

          <TouchableOpacity style={stylesGlobal.botaoUsuario} onPress={logout}>
              <Text style={stylesGlobal.txtBotaoUsuario}>Sair</Text>
          </TouchableOpacity>
      </ScrollView>
      </View>
      <Rodape telas={{ anterior: 'back'}} />
    </ImageBackground>
  );
}

export default PerfilTela;

const styles = StyleSheet.create({
  titulo: {
    marginBottom:'5%',
    textAlign: 'center', 
    fontSize: 22,
    color: 'white',
  },
  txtCampo:{
    fontWeight: 'bold', 
    fontSize: 22,
    color: 'white',
    // flexGrow: 1,
  },
  input: {
    fontSize: 20, 
    padding:5,
    // flexGrow:1,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
},
})