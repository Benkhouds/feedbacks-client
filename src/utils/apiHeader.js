

export default function apiHeader(token){
 return {headers: {Authorization: 'Bearer ' + token}} 
}