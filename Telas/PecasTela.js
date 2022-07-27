import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Cores from '../Constantes/Cores';

const PecasTela = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.secondary}}>
      <Text>PecasTela</Text>
    </View>
  )
}

export default PecasTela

const styles = StyleSheet.create({})