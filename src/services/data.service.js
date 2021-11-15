import {apiRoutes} from '../config/api'
import apiHeader from '../utils/apiHeader'

export default class DataService{

     static async getPublicContent(cancelToken, accessToken=''){
         if(accessToken){
            return apiRoutes.get('/feedbacks/protected/all',{cancelToken,...apiHeader(accessToken) } )             
        }
        return apiRoutes.get('/feedbacks',{cancelToken} )
     }
     static async getUserData(accessToken){
        return apiRoutes.post('/auth/refresh-token',{},apiHeader(accessToken))
     }
     static async getFeedback(id,accessToken){
         return apiRoutes.get(`/feedbacks/${id}`, apiHeader(accessToken))
     }
     static async addFeedback(title, category, details, accessToken){
         return apiRoutes.post('/feedbacks/', {title , category, details}, apiHeader(accessToken))
     }
     static async addComment(id, content, accessToken){
         return apiRoutes.post(`/feedbacks/${id}`, {content}, apiHeader(accessToken))
     }
     static async upVote(id, accessToken){
         return apiRoutes.patch(`/feedbacks/${id}/vote`,{}, apiHeader(accessToken))
     }
     static async reply(postId,commentId, content,accessToken){
         return apiRoutes.post(`${postId}/feedbacks/comments/${commentId}`, {content}, apiHeader(accessToken))
     }

}

