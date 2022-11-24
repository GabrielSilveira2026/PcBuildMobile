import React, {useState} from 'react';
import stylesGlobal, {Cores, imagemFundo} from '../Constantes/Styles'
import {TextInput,StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import Rodape from '../Componentes/Rodape'

const EsqueciSenhaTela = ({navigation}) => {
  const [email, setEmail] = useState('')
  
  return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={stylesGlobal.backgroundImage}>
      <View style={stylesGlobal.conteudoTela}>
        <View>
          <Text style={styles.titulo}>Esqueceu sua senha?</Text>
          <Text style={styles.enunciado}>Informe seu email de cadastro</Text>
          <TextInput
              onChangeText={(text) => {setEmail(text)}}
              //onEndEditing={()=>{setEstadoEmail(validaEmail(email))}}
              placeholderTextColor="#cccccc"
              style={styles.input}
              placeholder="exemplo@email.com.br"
          />

          <TouchableOpacity style={styles.botaoSenha}>
              <Text style={styles.txtBotaosenha}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Rodape telas={{ anterior: 'back'}} />
    </ImageBackground>
  );
}

export default EsqueciSenhaTela;

const styles = StyleSheet.create({
  titulo: {
    marginTop:'5%',
    textAlign: 'center', 
    fontSize: 22,
    color: 'white',
  },
  input:{
    fontSize: 20, 
    padding:5,
    flexGrow:1,
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  botaoSenha:{ 
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
  txtBotaosenha:{
      fontSize: 20,
      color: 'white',
  },
  enunciado:{
    marginTop:'5%',
    marginBottom:'5%',
    textAlign: 'center', 
    fontSize: 20,
    color: 'white',
  }
})