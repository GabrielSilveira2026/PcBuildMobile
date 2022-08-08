import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';
import styles from '../Constantes/Styles'
import {Feather} from 'react-native-vector-icons';

const image = require('../Imagens/Fundo.png');

const modelo = ({navigation}) => {
    return (
        <SafeAreaView style={styles.tela}>
            <SafeAreaView style={styles.conteudo}>
                <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
                
                </ImageBackground>
            </SafeAreaView>
      </SafeAreaView>
    );
}
