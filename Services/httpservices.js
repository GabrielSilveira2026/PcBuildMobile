import axios from "axios";

const api = axios.create({
  baseUrl: "https://api.scaleserp.com/search"
})


// const obterPrecos = () => {
//     const params = {
//       api_key: "7D464447DADD4803BB5CB37440920B14",
//       search_type: "shopping",
//       location: "Brazil",
//       q: "5600g"
//     }
    
//     axios.get('https://api.scaleserp.com/search', {params})
//     .then(response => {
//       setPrecos(response.data.shopping_results)
//       console.log(JSON.stringify(precos, 0, 2));
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   }


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

