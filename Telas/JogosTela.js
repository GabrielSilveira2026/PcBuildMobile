import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const JogosTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>Jogos Tela</Text>
      <Button 
            title="Programas tela"
            onPress={() => navigation.navigate('Programas')}
      />
    </View>
  );
}

export default JogosTela;

const styles = StyleSheet.create({})