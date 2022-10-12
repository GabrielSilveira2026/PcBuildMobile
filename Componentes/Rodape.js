import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from '../Constantes/Styles'

const Rodape = ({navigation}) => {

    return (
        <View style={styles.rodape}>
            {/* {
                anterior? */}
                    <TouchableOpacity
                        style={styles.botaoProximo}
                        onPress={() => navigation.navigate("Filtros")}
                    >    
                        <Text style={{ color: 'white' }}>Voltar</Text>
                    </TouchableOpacity>
                {/* :
                    null
            }
            {
                proximo? */}
                    <TouchableOpacity
                        style={styles.botaoProximo}
                        onPress={() => navigation.navigate("Selecionados")}
                    >    
                        <Text style={{ color: 'white' }}>Proxima</Text>
                    </TouchableOpacity>
                {/* :
                    null
            } */}
        </View>
    )
}

export default Rodape