import axios from "axios";
import {parse} from 'himalaya'

export const apiSteam = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})

export async function pesquisa2(j) {
  console.log("chamou")
  let cpuMin
  let ramMin
  let gpuMin
  let armazenamentoMin
  let cpuRec
  let ramRec
  let gpuRec
  let armazenamentoRec
  const listaProcurados = []
  const listaNomeID = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
  // console.log('achei 1: ', listaNomeID.data.applist.apps[0])
  for await (const item of listaNomeID.data.applist.apps) {
    if (item.name.toLowerCase().includes(j.toLowerCase())) {
      const idJogo = item.appid
      const objetoJogo = await axios.get('https://store.steampowered.com/api/appdetails?appids=' + idJogo)
      
      const detalheJogo = objetoJogo?.data[idJogo]?.data
      if (detalheJogo?.type === "game") {
        //pega requisitos Minimos
        if (detalheJogo?.pc_requirements?.minimum) {
          let dadosReqMin 
          const reqMinHtml = detalheJogo?.pc_requirements?.minimum
          const reqMinJson = parse(reqMinHtml)
          if (reqMinJson?.[2]?.children) {
            dadosReqMin = reqMinJson?.[2]?.children
          }
          else{
            dadosReqMin = reqMinJson?.[0]?.children
          }
          for (const obj of dadosReqMin) {
            let categoria
            let peca
            // categoria = obj?.children?.[0]?.children?.[0] ? obj.children[0].children[0].content ? :

            if(obj?.children?.[0]?.children?.[0]){
              categoria = obj.children[0].children[0].content
            }
            else if(obj?.children?.[0])
            {
              categoria = obj.children[0].content
            }
            else{
              categoria = ''
            }
            if (obj?.children?.[1]?.content) {
              peca = obj?.children[1]?.content
              switch (categoria) {
                case 'Processor:' || 'Processador':
                  cpuMin = peca;
                case 'Memory:' || 'Memória':
                  ramMin = peca;
                case 'Graphics:' || 'Placa de vídeo' || 'Video Card:':
                  gpuMin = peca;
                case 'Storage:' || 'Armazenamento' || "Hard Disk Space: :":
                  armazenamentoMin = peca;
                default:
                  ''
              }
            }
          }
        }

        // pega requisitos Recomendados
        if (detalheJogo?.pc_requirements?.recommended) {
          const reqRecHtml = detalheJogo?.pc_requirements?.recommended
          const reqRecJson = parse(reqRecHtml)
          const dadosReqRec = reqRecJson[2]?.children
          for (const obj of dadosReqRec) {
            let categoria
            let peca
            if(obj?.children?.[0].children?.[0]){
              categoria = obj.children[0].children[0].content
            }
            else{
              categoria = obj.children[0].content
            }
            if (obj?.children[1]?.content) {
              peca = obj?.children[1]?.content
              switch (categoria) {
                case 'Processor:' || 'Processador':
                  cpuRec = peca;
                case 'Memory:' || 'Memória':
                  ramRec = peca;
                case 'Graphics:' || 'Placa de vídeo' || 'Video Card:':
                  gpuRec = peca;
                case 'Storage:' || 'Armazenamento' || "Hard Disk Space: :":
                  armazenamentoRec = peca;
                default:
                  '';
              }
            }
        }
        }
        
        const minimo = {'Cpu':cpuMin, 'Ram':ramMin, 'Gpu':gpuMin, 'Armazenamento': armazenamentoMin};
        const recomendado = {'Cpu':cpuRec, 'Ram':ramRec, 'Gpu':gpuRec, 'Armazenamento': armazenamentoMin}
        const jogo = {
          id: detalheJogo?.steam_appid,
          nome: detalheJogo?.name,
          imagem: detalheJogo?.header_image,
          requisitosMinimos: minimo,
          RequisitosRecomendados: recomendado,
          preco: detalheJogo?.price_overview?.final_formatted,
          estado: 'circle'
        }
        listaProcurados.push(jogo)
      }
    }
  }
  return listaProcurados
}

// export const pesquisa = (j) => {
//   const listaProcurados = []
//   var x
//   const resposta = axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
//     .then(response => {
//       return response.data.applist.apps
//     })
//     .then(response => {
//       response.forEach(e => {
//         if (e.name.toLowerCase().includes(j.toLowerCase())){
//           axios.get('https://store.steampowered.com/api/appdetails?appids=' + e.appid)
//           .then(response => {
//             const dados = response.data[e.appid].data
//             if(dados?.type === "game"){
//               x = {
//                 id: dados?.steam_appid,
//                 nome: dados?.name,
//                 imagem: dados?.header_image,
//                 requisitosMinimos: dados?.pc_requirements?.minimum,
//                 requisitosRecomendados: dados?.pc_requirements?.recommended,
//                 preco: dados?.price_overview?.final_formatted,
//                 estado: "toggle-off"
//               }
//               listaProcurados.push(x)
//             }
//           })
//         }
//       })
//     })
//     //     for (var i = 0; i < response.length; i++) {
//     //       if (response[i].name.toLowerCase().includes(j.toLowerCase())) {
//     //         const jogoPesquisado = response[i].appid
//     //         axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado)
//     //           .then(response => {
//     //             const dados = response.data[jogoPesquisado]?.data
//     //             if (dados?.type === "game") {
//     //               x = {
//     //                 id: dados?.steam_appid,
//     //                 nome: dados?.name,
//     //                 imagem: dados?.header_image,
//     //                 requisitosMinimos: dados?.pc_requirements?.minimum,
//     //                 requisitosRecomendados: dados?.pc_requirements?.recommended,
//     //                 preco: dados?.price_overview?.final_formatted,
//     //                 estado: "toggle-off"
//     //               }
//     //             }
//     //             listaProcurados.push(x)
//     //           })
//     //           .catch(error => {
//     //             console.log(error);
//     //           });
//     //         }
//     //       }
//     //       return listaProcurados
//     // })
//   console.log(resposta)
//   return resposta
// }
// export const apiSteam = axios.create({
//   baseUrl: "store.steampowered.com/api/appdetails?appids"
// })



















// function usaApi({produto}){

//   const obterPrecos = () => {
//     const endPoint = `https://api.scaleserp.com/search?api_key=B9E7BDF7D3024533B62B918CED851541&search_type=shopping&location=Brazil&q=${produto}`
//     fetch(endPoint)
//       .then(response => {
//         return response.json()
//       })
//       .then(dados => {
//         setPrecos(data.shopping_results[0].link)
//       })
//   }
// }

