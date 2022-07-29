import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const image = require('../Imagens/Fundo.png');

export default StyleSheet.create({
    // imageBackground: {
    //   width: '100%', 
    //   height: '100%',
    //   flex: 1,
    //   resizeMode: "cover",
    //   justifyContent: "center",
    //   alignItems: "center"
    // },
    tela:{
      textAlign: "center",
      justifyContent: "center",
    },
    conteudo:{
      textAlign: "center",
      height: '89.9%',
      backgroundColor: Cores.secondary,
    },
    rodape:{
      padding: 8,
      height:80,
      width: '100%',
      backgroundColor: Cores.primary,
      borderWidth: 2,
      borderRadius: 7,
      justifyContent: 'flex-end',
    },
    
  botaoProximo:{
      alignItems: "center",
      borderRadius: 7,
      padding:15,
      width: '100%',
      backgroundColor: 'black'
  }
  });