import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const ProgramasTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>Programas Tela</Text>
      <Button 
            title="Selecionados tela"
            onPress={() => navigation.navigate('Selecionados')}
      />
    </View>
  )
}

export default ProgramasTela

const styles = StyleSheet.create({})