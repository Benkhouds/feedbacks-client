import {apiRoutes} from '../config/api'
import apiHeader from '../utils/apiHeader'

export default class DataService{

     static async getPublicContent(cancelToken, accessToken='', category="", sort="-voteScore"){
         if(accessToken){
            return apiRoutes.get(`/feedbacks/protected/all/?category=${category}&sort=${sort}`,
            {cancelToken,...apiHeader(accessToken) } )             
        }
        return apiRoutes.get(`/feedbacks/?category=${category}&sort=${sort}`,{cancelToken} )
     }
     static async getUserData(accessToken){
        return apiRoutes.post('/auth/refresh-token',{},apiHeader(accessToken))
     }
     static async getFeedback(id,cancelToken, accessToken){
         return apiRoutes.get(`/feedbacks/${id}`,{cancelToken,  ...apiHeader(accessToken)})
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

