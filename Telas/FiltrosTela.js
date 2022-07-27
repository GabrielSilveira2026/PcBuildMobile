import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const FiltrosTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>Filtros Tela</Text>
      <Button 
            title="Recomendados tela"
            onPress={() => navigation.navigate('Recomendados')}
      />
    </View>
  )
}

export default FiltrosTela

const styles = StyleSheet.create({})
