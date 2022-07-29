import * as React from 'react';
import {SafeAreaView , Button, Image, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';

export default function Rodape(){
    return(
        <SafeAreaView style={styles.rodape}>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    rodape: {
        padding: 8,
        height:80,
        width: '100%',
        backgroundColor: Cores.primary,
        borderTopWidth: 2,
        justifyContent: 'flex-end',
    },
})