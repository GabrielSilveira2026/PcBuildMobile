import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const SelecionadosTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>SelecionadosTela</Text>
      <Button 
            title="Filtros tela"
            onPress={() => navigation.navigate('Filtros')}
      />
    </View>
  )
}

export default SelecionadosTela

const styles = StyleSheet.create({})