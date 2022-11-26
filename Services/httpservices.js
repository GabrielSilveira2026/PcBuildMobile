import axios from "axios";
import {parse} from 'himalaya'

const regex = /[^0-9a-zA-Z() " : , { } @ . / -]/gi

const extraiRequisitos = (requisito)=>{
  const reqHtml = requisito
  const reqJson = parse(reqHtml)
  let dadosReq, cpu, ram, armazenamento, gpu

  if (reqJson?.[0]?.children && reqJson?.[0]?.children?.[1]) {
    dadosReq = reqJson?.[0]?.children 
  }
  else if (reqJson?.[1]?.children && reqJson[1].children?.[1]) {
    dadosReq = reqJson?.[1]?.children
  }
  else if (reqJson?.[2]?.children && reqJson[2].children?.[1]) {
    dadosReq = reqJson?.[2]?.children
  }
  else if (reqJson?.[3]?.children && reqJson[3].children?.[1]) {
    dadosReq = reqJson?.[3]?.children
  }
  else {
    dadosReq = reqJson?.[2]?.children
  }
  
  for (const obj of dadosReq) {
    let categoria
    let peca
    if(obj?.children?.[0]?.children?.[0]){
      categoria = obj.children[0].children[0].content.toLowerCase()
    }
    else if(obj?.children?.[0]){
      categoria = obj.children[0].content.toLowerCase()
    }
    else{
      categoria = ''
    }
    if (obj?.children?.[1]?.content) {
      peca = obj?.children[1]?.content
      if (categoria.includes('Proces')) {
        cpu = peca.replace(regex, '');
      }
      else if (categoria.includes('Mem')){
        ram = peca.replace(regex, '');
      }
      else if (categoria.includes('raphic') || categoria.includes('ídeo') || categoria.includes('video')|| categoria.includes('ficos')||categoria.includes('vídeo')){
        gpu = peca.replace(regex, '');
      }
      else if (categoria.includes('torag') || categoria.includes('rmazenament') || categoria.includes('pace')|| categoria.includes('ento')){
        armazenamento = peca.replace(regex, '');
      }

      // switch (categoria) {
      //   case 'Processor:' || 'Processador':
      //     cpu = peca.replace(regex, '');
      //     break;
      //   case 'Memory:' || 'Memória':
      //     ram = peca.replace(regex, '');
      //     break;
      //   case 'Graphics:' || 'Placa de vídeo:'||  'Video Card:':
      //     gpu = peca.replace(regex, '');
      //     break;
      //   case 'Storage:' || 'Armazenamento:' || 'Hard Disk Space:':
      //     armazenamento = peca.replace(regex, '');
      //     break;
      // }
    }
  }
  // console.log(resultado);
  const requisitos = `{"Armazenamento": "${armazenamento}","Cpu": "${cpu}","Gpu": "${gpu}","Ram": "${ram}"}`
  // console.log(requisitos)
  return requisitos;

}

export function extraiRequisitosDeUmaLista(listaDeJogos){
  let listaRequisitosMinimos = []
  let listaRequisitosRecomendados = []
  let listaJogosSemRequisitos = []
  for (let jogo of listaDeJogos) {
    if (jogo.requisitosminimos) {
      let requisitosJson = JSON.parse(jogo.requisitosminimos)
      console.log(requisitosJson);
      // for (const campo in requisitosJson) {
      //   if(requisitosJson[campo] === 'undefined'){
      //     delete requisitosJson[campo]
      //   };
      // }
      if (requisitosJson?.Cpu === 'undefined' || requisitosJson?.Ram === 'undefined' || requisitosJson?.Gpu === 'undefined' || requisitosJson?.Armazenamento === 'undefined') {
        if(!listaJogosSemRequisitos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
          listaJogosSemRequisitos.push(jogo.nome)
        }
      }
      listaRequisitosMinimos.push(requisitosJson)
    }
    else{
      if(!listaJogosSemRequisitos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
        listaJogosSemRequisitos.push(jogo.nome)
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
        if(!listaJogosSemRequisitos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
          listaJogosSemRequisitos.push(jogo.nome)
        } 
      }
      listaRequisitosRecomendados.push(requisitosJson)
    }
    else{
      if(!listaJogosSemRequisitos.find(jogoSemReq =>{return jogoSemReq === jogo.nome})){
        listaJogosSemRequisitos.push(jogo.nome)
      }
        
    }
  }
  return {listaRequisitosMinimos, listaRequisitosRecomendados, listaJogosSemRequisitos}
}

export async function calculaPlacaBackEnd(selecionados, tipoRequisito){
  const gpusRequisitos = []
  const regex = /[^0-9a-zA-Z]/gm
  if (selecionados.length > 0) {
    for await (const jogo of selecionados) {
      if (jogo['requisitos'+tipoRequisito]) {
        let req = JSON.parse(jogo['requisitos'+tipoRequisito])
        let gpuJogo = req.Gpu;
        const listaGpusBanco = await axios.get("https://g4673849dbf8477-qwkkduaklu8amhgz.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/ranking_gpu/?limit=999")
        for (const GpuBanco of listaGpusBanco?.data?.items.reverse()) {
          if (gpuJogo.replace(regex, "").replace("GTX", "geforcegtx").toLowerCase().includes(GpuBanco?.gpu.replace(regex, "").toLowerCase().replace("geforce", ""))) {
              gpusRequisitos.push({ "Placa": GpuBanco?.gpu, Pontos: GpuBanco?.gflops })
          }
        }
      }
    }
    if (gpusRequisitos.length>0) {
      let placaIndicada = gpusRequisitos.reduce((placaAnterior, placaAtual) => (placaAnterior.Pontos > placaAtual.Pontos) ? placaAnterior : placaAtual)
      // const params = {
      //   api_key: "B9E7BDF7D3024533B62B918CED851541",
      //   search_type: "shopping",
      //   location: "Brazil",
      //   q: placaIndicada.Placa
      // }
      // const googleShopping = await axios.get('https://api.scaleserp.com/search', {params})
      // const praquinha = await googleShopping?.data?.shopping_results?.[1]
      // console.log(praquinha);
      // return praquinha
      return {"title": placaIndicada.Placa}
    }
    else{
      // console.log('Não foi possivel calcular uma placa.');
      return 
    }
  }
}

const check = (req, gpu) => {
  const requisito = req.toLowerCase().split(' ')
  const placa = gpu.toLowerCase().split(' ')

  let comum = ''
  for(let palavra of requisito){
    
    if(placa.indexOf(palavra) >= 0){
      comum = comum + " " + palavra
    }
  }
  if (comum.split(' ').length > 2) {
    return comum
  }
  return "Não foi possivel"
}

export function validaEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,4}$/g
  return(regex.test(email))
}

export function validaSenha(senha){
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/
  return(regex.test(senha))
}