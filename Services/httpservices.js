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
    // console.log(reqJson[2].children?.[1]);
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
      if (categoria.includes('proces')) {
        cpu = peca.replace(regex, '');
      }
      else if (categoria.includes('mem')){
        ram = peca.replace(regex, '');
      }
      else if (categoria.includes('raphic') || categoria.includes('ídeo') || categoria.includes('video')|| categoria.includes('ficos')||categoria.includes('vídeo')){
        gpu = peca.replace(regex, '');
      }
      else if (categoria.includes('torag') || categoria.includes('rmazenament') || categoria.includes('pace')|| categoria.includes('ento') || categoria.includes('riv')){
        armazenamento = peca.replace(regex, '');
      }
    }
  }
  // console.log(resultado);
  const requisitos = `{"Armazenamento": "${armazenamento}","Cpu": "${cpu}","Gpu": "${gpu}","Ram": "${ram}"}`
  // console.log(requisitos)
  return requisitos;

}

export async function pesquisa2(j) {
  const listaProcurados = []
  const listaNomeID = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
  for await (const item of listaNomeID.data.applist.apps) {
    if (item.name.toLowerCase().includes(j.toLowerCase())) {
      const idJogo = item.appid
      let objetoJogo
      try {
        objetoJogo = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + idJogo)
        if (objetoJogo?.data[idJogo]?.success === true){
          const detalheJogo = objetoJogo?.data[idJogo]?.data
          if (detalheJogo?.type === "game") {
            // console.log(detalheJogo?.steam_appid);
            const jogo = {
              id_jogo_steam: detalheJogo?.steam_appid,
              nome: detalheJogo?.name.replace(regex, ''),
              imagem: detalheJogo?.header_image,
              preco: detalheJogo?.price_overview?.final_formatted,
              estado: 'circle'
            }
            if (detalheJogo?.pc_requirements?.minimum) {
              jogo.requisitosminimos = `${extraiRequisitos(detalheJogo?.pc_requirements?.minimum)}`
            }
  
            if (detalheJogo?.pc_requirements?.recommended) {
              jogo.requisitosrecomendados = extraiRequisitos(detalheJogo?.pc_requirements?.recommended)
            }
            listaProcurados.push(jogo)
          }
        }
      } catch (error) {
        console.log(error);
      } 
      
    }
  }
  return listaProcurados
}

export async function calculaRam(jogosSelecionados, tipoRequisito){
  if (jogosSelecionados.length>0) {
    const ramDosJogos = []
    const regex = /[^\dG]/gm
    // const regex = new RegExp('')
    for await (const jogo of jogosSelecionados) {
      let ramDoJogo
      if (jogo['requisitos'+tipoRequisito]) {
        let requisitosJson = JSON.parse(jogo['requisitos'+tipoRequisito])
        if (requisitosJson.Ram.toLowerCase().includes('gb')) {
          ramDoJogo = parseInt(requisitosJson.Ram.replace(regex, ''))
        }
        else {
          ramDoJogo = 4
        }
  
        ramDosJogos.push(ramDoJogo)
      }
      else{
        ramDosJogos.push(4)
      }
    }
    let ramIndicada = Math.max(...ramDosJogos)
    return {"title": ramIndicada + " GB"};
  }
  return null
}

export function extraiRequisitosDeUmaLista(listaDeJogos){
  let listaRequisitosMinimos = []
  let listaRequisitosRecomendados = []
  let listaJogosSemRequisitos = []
  for (let jogo of listaDeJogos) {
    if (jogo.requisitosminimos) {
      let requisitosJson = JSON.parse(jogo.requisitosminimos)
      listaRequisitosMinimos.push(requisitosJson)
    }
    else{
      listaJogosSemRequisitos.push(jogo.nome)
    }
  }
  for (let jogo of listaDeJogos) {
    if (jogo.requisitosrecomendados) {
      let requisitosJson = JSON.parse(jogo.requisitosrecomendados)
      listaRequisitosRecomendados.push(requisitosJson)
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