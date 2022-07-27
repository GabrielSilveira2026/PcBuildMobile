import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const RecomendadosTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>RecomendadosTela</Text>
      <Button 
            title="Pecas tela"
            onPress={() => navigation.navigate('Pecas')}
      />
    </View>
  )
}

export default RecomendadosTela

const styles = StyleSheet.create({})