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
      categoria = obj.children[0].children[0].content
    }
    else if(obj?.children?.[0]){
      categoria = obj.children[0].content
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
      else if (categoria.includes('raphic') || categoria.includes('ídeo') || categoria.includes('Video')|| categoria.includes('ficos')){
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

export async function pesquisa2(j) {
  console.log("chamou")
  const listaProcurados = []
  const listaNomeID = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
  for await (const item of listaNomeID.data.applist.apps) {
    if (item.name.toLowerCase().includes(j.toLowerCase())) {
      const idJogo = item.appid
      let objetoJogo
      try {
        objetoJogo = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + idJogo)
      } catch (error) {
        console.log(error);
      } 
      if (objetoJogo?.data[idJogo]?.success === true){
        const detalheJogo = objetoJogo?.data[idJogo]?.data
        if (detalheJogo?.type === "game") {
          console.log(detalheJogo?.steam_appid);
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
          console.log(jogo);
          listaProcurados.push(jogo)
        }
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

export function extraiRequisitosDeUmaLista(listaDeJogos, tipoRequisito){
  let listaDeRequisitos = []
  for (let jogo of listaDeJogos) {
    if (jogo['requisitos'+tipoRequisito]) {
      let requisitosJson = JSON.parse(jogo['requisitos'+tipoRequisito])
      listaDeRequisitos.push(requisitosJson)
    }
  }
  return listaDeRequisitos
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
      return {"title":placaIndicada.Placa}
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