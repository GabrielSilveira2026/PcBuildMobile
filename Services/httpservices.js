import axios from "axios";

export const apiSteam = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})

export async function pesquisa(j){
  const listaProcurados = []
  const resposta = await axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
    .then(response => {
      return response.data.applist.apps
    })
    .then(listaApps => {
      listaApps.forEach(e => {
        if (e.name.toLowerCase().includes(j.toLowerCase())){
          axios.get('https://store.steampowered.com/api/appdetails?appids=' + e.appid)
          .then(response => {
            return response?.data[e.appid]?.data?.type === "game" ? response.data[e.appid].data : false
          })
          .then(dados=>{
            listaProcurados.push({
              id: dados?.steam_appid,
              nome: dados?.name,
              imagem: dados?.header_image,
              requisitosMinimos: dados?.pc_requirements?.minimum,
              requisitosRecomendados: dados?.pc_requirements?.recommended,
              preco: dados?.price_overview?.final_formatted,
              estado: "toggle-off"
            })
          })
        }
      })
      return listaProcurados
    })
  await Promise.all(resposta)
  console.log("https:", resposta)
  return resposta
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

