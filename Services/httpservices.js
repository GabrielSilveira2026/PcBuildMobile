import axios from "axios";
import {parse} from 'himalaya'

const regex = /[^0-9a-zA-Z() " : , { } @ . / -]/gi

export function extraiRequisitosDeUmaLista(listaDeJogos){
  let listaRequisitosMinimos = []
  let listaRequisitosRecomendados = []
  let listaJogosSemRequisitosMinimos = []
  let listaJogosSemRequisitosRecomendados = []
  for (let jogo of listaDeJogos) {
    if (jogo.requisitosminimos) {
      let requisitosJson = JSON.parse(jogo.requisitosminimos)
      // for (const campo in requisitosJson) {
      //   if(requisitosJson[campo] === 'undefined'){
      //     delete requisitosJson[campo]
      //   };
      // }
      if (requisitosJson?.Cpu === 'undefined' || requisitosJson?.Ram === 'undefined' || requisitosJson?.Gpu === 'undefined' || requisitosJson?.Armazenamento === 'undefined') {
        if(!listaJogosSemRequisitosMinimos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
          listaJogosSemRequisitosMinimos.push(jogo.nome)
        }
      }
      listaRequisitosMinimos.push(requisitosJson)
    }
    else{
      if(!listaJogosSemRequisitos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
        listaJogosSemRequisitosMinimos.push(jogo.nome)
      }
    }

    if (jogo.requisitosrecomendados) {
      let requisitosJson = JSON.parse(jogo.requisitosrecomendados)
      // for (const campo in requisitosJson) {
      //   if(requisitosJson[campo] === 'undefined'){
      //     delete requisitosJson[campo]
      //   };
      // }
      if (requisitosJson?.Cpu === 'undefined' || requisitosJson?.Ram === 'undefined' || requisitosJson?.Gpu === 'undefined' || requisitosJson?.Armazenamento === 'undefined') {
        if(!listaJogosSemRequisitosRecomendados.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
          listaJogosSemRequisitosRecomendados.push(jogo.nome)
        } 
      }
      listaRequisitosRecomendados.push(requisitosJson)
    }
    else{
      if(!listaJogosSemRequisitosRecomendados.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
        listaJogosSemRequisitosRecomendados.push(jogo.nome)
      }
        
    }
  }
  return {listaRequisitosMinimos, listaRequisitosRecomendados, listaJogosSemRequisitosMinimos, listaJogosSemRequisitosRecomendados}
}

export function validaEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/g
  return(regex.test(email))
}

export function validaSenha(senha){
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
  return(regex.test(senha))
}