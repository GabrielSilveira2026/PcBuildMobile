import * as React from 'react';
import {TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import styles, {Cores, imagemFundo} from '../Constantes/Styles'
import Rodape from '../Componentes/Rodape'
import { Feather } from 'react-native-vector-icons';

const image = require('../Imagens/Fundo.png');

const LoginTela = ({ navigation }) => {
    return (
    <ImageBackground backgroundColor={Cores.secondary} source={imagemFundo} resizeMode="stretch" style={styles.backgroundImage}>
    <View style={{ height: "90%", padding: 15, flexDirection: 'column', justifyContent:'space-between'}}>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 30, marginTop: '10%' }}>Entrar</Text>

                    <Text style={stylesL.titulo}>Email</Text>
                    <TextInput
                        style={{ padding: 7, fontSize: 20, backgroundColor: 'white', borderRadius: 4 }}
                        placeholder="exemplo@email.com.br"
                        />

                    <Text style={stylesL.titulo}>Senha</Text>
                    <TextInput
                        style={stylesL.input}
                        placeholder="************"
                        />
                    <TouchableOpacity
                        style={[{ padding: 7, marginTop: '8%'},styles.botaoProximo ]}
                        >
                        <Text style={{ color: 'white', fontSize: 18 }}>Entrar</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', textDecorationLine: 'underline', fontWeight: 'bold', color: 'black', fontSize: 15}} onPress={() => navigation.navigate('Jogos')}>
                        Esqueci a senha!
                    </Text>
                </View>
                <Text style={{textAlign: 'center',textDecorationLine: 'underline', fontWeight: 'bold', fontSize: 15}} onPress={() => navigation.navigate('Jogos')}>
                    Não tenho cadastro ainda.
                </Text>
            </View>

            <Rodape telas={{anterior: 'Recomendados',proxima:'Login'}} />
            
        </ImageBackground>
    );
}

export default LoginTela;

const stylesL = StyleSheet.create({
    titulo: {
        fontWeight: 'bold', 
        color: 'black', 
        fontSize: 25, 
        marginTop: '5%'
    },
    input: {
        padding: 7, 
        fontSize: 20, 
        backgroundColor: 'white', 
        borderRadius: 4
    }
})