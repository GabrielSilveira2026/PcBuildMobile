import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 50}}>Primeira Tela</Text>
        <Button 
          title="Segunda tela"
          onPress={() => navigation.navigate('Segunda')}
        />
      </View>
    );
}

export default HomeScreen(navigation);