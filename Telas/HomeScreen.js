import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import Cores from '../Constantes/Cores'

const HomeScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundImage: url('../Imagens/Fundo.png')}}>
        <Text style={{fontSize: 25}}>Primeira Tela</Text>
        <Button 
            title="Segunda tela"
            onPress={() => navigation.navigate('Segunda')}
        />
        </View>
    );
}

export default HomeScreen;

