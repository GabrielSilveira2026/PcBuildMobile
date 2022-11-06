import axios from "axios";
import {parse} from 'himalaya'

export const apiSteam = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})

const extraiRequisitos = (requisito)=>{
  const resultado = {}
  const reqHtml = requisito
  const reqJson = parse(reqHtml)
  let dadosReq, cpu, ram, armazenamento, gpu

  // for (let i = 0; i < 10; i++) {
  //   console.log('teste');
  //   if (reqJson?.[i]?.children && reqJson?.[i]?.children?.[i+2]) {
  //     console.log('teste')
  //     dadosReq = reqJson?.[i]?.children
  //   }
  // }

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
      switch (categoria) {
        case 'Processor:' || 'Processador':
          cpu = peca;
        case 'Memory:' || 'Memória':
          ram = peca;
        case 'Graphics:' || 'Placa de vídeo:'||  'Video Card:':
          gpu = peca;
        case 'Storage:' || 'Armazenamento' || 'Hard Disk Space':
         armazenamento = peca;
      }
    }
  }
  // console.log(resultado);
  const requisitos = `{"Armazenamento": "${armazenamento}","Cpu": "${cpu}","Gpu": "${gpu}","Ram": "${ram}"}`
  console.log(requisitos)
  return requisitos;

}

export async function pesquisa2(j) {
  console.log("chamou")
  let cpuMin, ramMin, gpuMin, armazenamentoMin,cpuRec, ramRec, gpuRec, armazenamentoRec
  const listaProcurados = []
  const listaNomeID = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
  for await (const item of listaNomeID.data.applist.apps) {
    if (item.name.toLowerCase().includes(j.toLowerCase())) {
      const idJogo = item.appid
      const objetoJogo = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + idJogo)
      if (objetoJogo){
        const detalheJogo = objetoJogo?.data[idJogo]?.data
        if (detalheJogo?.type === "game") {

          //pega requisitos Minimos
          // if (detalheJogo?.pc_requirements?.minimum) {
          //   let dadosReqMin 
          //   const reqMinHtml = detalheJogo?.pc_requirements?.minimum
          //   const reqMinJson = parse(reqMinHtml)

          //   if (reqMinJson?.[0]?.children && reqMinJson?.[0]?.children?.lenght > 1) {
          //     console.log('caso 1')
          //     dadosReqMin = reqMinJson?.[0]?.children 
          //   }
          //   else if (reqMinJson?.[1]?.children && reqMinJson[1].children.lenght > 1) {
          //     console.log('caso 2')
          //     dadosReqMin = reqMinJson?.[1]?.children
          //   }
          //   else if (reqMinJson?.[2]?.children && reqMinJson[2].children.length > 1) {
          //     dadosReqMin = reqMinJson?.[2]?.children
          //   }
          //   else if (reqMinJson?.[3]?.children && reqMinJson[3].children.lenght > 1) {
          //     console.log('caso 4')
          //     dadosReqMin = reqMinJson?.[3]?.children
          //   }
          //   else {
          //     console.log('caso 5')
          //     dadosReqMin = reqMinJson?.[4]?.children
          //   }
          //   // console.log(reqMinJson);
          //   for (const obj of dadosReqMin) {
          //     let categoria
          //     let peca
          //     if(obj?.children?.[0]?.children?.[0]){
          //       categoria = obj.children[0].children[0].content
          //     }
          //     else if(obj?.children?.[0]){
          //       categoria = obj.children[0].content
          //     }
          //     else{
          //       categoria = ''
          //     }
          //     if (obj?.children?.[1]?.content) {
          //       peca = obj?.children[1]?.content
          //       switch (categoria) {
          //         case 'Processor:' || 'Processador':
          //           cpuMin = peca;
          //         case 'Memory:' || 'Memória':
          //           ramMin = peca;
          //         case 'Graphics:' || 'Placa de vídeo' || 'Video Card:':
          //           gpuMin = peca;
          //         case 'Storage:' || 'Armazenamento' || "Hard Disk Space: :":
          //           armazenamentoMin = peca;
          //         default:
          //           ''
          //       }
          //       peca = ''
          //     }
          //   }
          // }

          // pega requisitos Recomendados
          // if (detalheJogo?.pc_requirements?.recommended) {
          //   const reqRecHtml = detalheJogo?.pc_requirements?.recommended
          //   const reqRecJson = parse(reqRecHtml)
          //   const dadosReqRec = reqRecJson[2]?.children
          //   for (const obj of dadosReqRec) {
          //     let categoria
          //     let peca
          //     if(obj?.children?.[0].children?.[0]){
          //       categoria = obj.children[0].children[0].content
          //     }
          //     else{
          //       categoria = obj.children[0].content
          //     }
          //     if (obj?.children[1]?.content) {
          //       peca = obj?.children[1]?.content
          //       switch (categoria) {
          //         case 'Processor:' || 'Processador':
          //           cpuRec = peca;
          //         case 'Memory:' || 'Memória':
          //           ramRec = peca;
          //         case 'Graphics:' || 'Placa de vídeo' || 'Video Card:':
          //           gpuRec = peca;
          //         case 'Storage:' || 'Armazenamento' || "Hard Disk Space: :":
          //           armazenamentoRec = peca;
          //         default:
          //           '';
          //       }
          //     }
          // }
          // }
          
          // const minimo = {'Cpu':cpuMin, 'Ram':ramMin, 'Gpu':gpuMin, 'Armazenamento': armazenamentoMin};
          // const recomendado = {'Cpu':cpuRec, 'Ram':ramRec, 'Gpu':gpuRec, 'Armazenamento': armazenamentoMin}
          const jogo = {
            id_jogo_steam: detalheJogo?.steam_appid,
            nome: detalheJogo?.name,
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
    }
  }
  return listaProcurados
}