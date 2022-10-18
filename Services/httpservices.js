import axios from "axios";

export const apiSteam = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})

export const pesquisa = (jogo, listaProcurados) => {
  if (jogo !== "") {
    axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=1640848EDE04C9DDF3967D8655B2C265&format=jogos')
    .then(response => {
      for(var i = 0; i < response.data.applist.apps.length; i++){
        if(response.data.applist.apps[i].name.toLowerCase().includes(jogo.toLowerCase())){
          const jogoPesquisado= response.data.applist.apps[i].appid
          axios.get('https://store.steampowered.com/api/appdetails?appids=' + jogoPesquisado)
          .then(response => {
            const dados = response.data[jogoPesquisado]?.data
            if (dados?.type === "game") {
              const x = {
                id: dados?.steam_appid,
                nome: dados?.name, 
                imagem: dados?.header_image,
                requisitosMinimos: dados?.pc_requirements?.minimum,
                requisitosRecomendados: dados?.pc_requirements?.recommended,
                preco: dados?.price_overview?.final_formatted,
                estado: "toggle-off"
              }
              listaProcurados.push(x)
              console.log("httpsservices:", listaProcurados)
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
      return listaProcurados
    })
  }
  else {
    return false
  }
}
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

