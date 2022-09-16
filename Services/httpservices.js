import axios from "axios";

const api = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})
// export const apiSteam = axios.create({
//   baseUrl: "store.steampowered.com/api/appdetails?appids"
// })

export default api;


















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

