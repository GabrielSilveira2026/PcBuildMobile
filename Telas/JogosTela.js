import * as React from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import Cores from '../Constantes/Cores';

const JogosTela = ({navigation}) => {
  return (
    <ImageBackground source={require('../Imagens/Fundo.png')} style={styles.imageBackground}>
      <View style={styles.corpo}>
          <Text> Jogos Tela</Text>
          <Button 
                title="Programas tela"
                onPress={() => navigation.navigate('Programas')}
          />
      </View>
    </ImageBackground>
  );
}

export default JogosTela;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%', 
    height: '100%',
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  corpo:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  }
});
