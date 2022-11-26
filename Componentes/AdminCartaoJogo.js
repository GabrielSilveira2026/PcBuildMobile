import {StyleSheet,TouchableOpacity, Text, ImageBackground, Alert} from 'react-native'
import React from 'react'
import {FontAwesome5} from 'react-native-vector-icons';
import {useCart} from '../Constantes/CartContext'
import {Cores} from '../Constantes/Styles'
import axios from 'axios'
const AdminCartaoJogo = ({jogo}) => {
    const cart = useCart()
    const {id_jogo_steam, nome, imagem, preco, requisitosrecomendados} = jogo
    const requisitosminimos = jogo.requisitosminimos? JSON.parse(jogo.requisitosminimos): undefined
    // console.log(requisitosminimos);
    const mudaEstado = async() => {
        if (jogo.estado === "circle"){
            if (cart.cart.length < 50) {
                let regex = /[^0-9a-zA-Z]/gm
                jogo.estado = "check-circle"
                const banco = await axios.get("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/jogo_tb/?limit=9999");

                if(banco.data.items.find(item => item.id_jogo_steam === jogo.id_jogo_steam)){
                    Alert.alert("Já esta cadastrado")
                }
                else{
                    try {
                        await axios.post("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/jogo_tb/", jogo);
                        Alert.alert("Cadastrado", "o jogo\n" + jogo.nome + "\nfoi cadastrado com sucesso")
                        cart.addToCart(jogo)
                    } catch (error) {
                        Alert.alert("Erro", "não foi possivel adicionar jogo")
                    }
                }
            }
            else{
                Alert.alert("Você já selecionou 5 jogos","Por favor, remova algum deles para adicionar um outro")
            }
        }
        else{
            jogo.estado = "circle"
            cart.removeToCart(id_jogo_steam)
        }
    }
    
  return (
    <TouchableOpacity style={styles.cartao} onPress={mudaEstado}>
        <ImageBackground source={{ uri: imagem?imagem: 'https://cdn-icons-png.flaticon.com/512/2140/2140618.png'}} style={styles.imagem} imageStyle={styles.imageBackground}>
            <FontAwesome5 style={styles.selecao} name={jogo.estado} size={25} color="#cccccc" />
        </ImageBackground>
        
        <Text style={styles.titulo}>{nome ? nome :  "não identificado"}</Text >
        <Text>{requisitosminimos?requisitosminimos.Gpu:'Sem requisitos'}</Text>
    </TouchableOpacity>
  )
}

export default AdminCartaoJogo;

const styles = StyleSheet.create({
    cartao:{
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: Cores.tertiary,
        flexGrow: 1,
        width:'49%',
        marginLeft:2,
        marginRight:2,
        borderRadius: 8,
        borderWidth:2,
    },
    imagem:{
        height: 120,
        width: "100%",
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    imageBackground:{
        borderRadius:7, 
        resizeMode:'cover'
    },
    selecao:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 6,
        backgroundColor: Cores.secondary,
        width: 'auto',
        marginLeft: 'auto',
        padding: 4
    },
    titulo:{
        flex:1,
        fontSize: 15, 
        textAlign: "center", 
        textAlignVertical: "center",
        fontWeight: 'bold',
        margin:5
    }
})