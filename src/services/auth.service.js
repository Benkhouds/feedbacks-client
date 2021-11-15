import {apiRoutes} from "../config/api";
import apiHeader from '../utils/apiHeader'

class AuthService {
  
  async login(email, password) {
    return apiRoutes.post("/auth/login", {
           email,
           password
         })
  }

  async logout(token) {
    return  apiRoutes.post('/auth/logout',{}, apiHeader(token));
  }


  async register(username, firstName ,lastName, email, password) {

   return apiRoutes.post("/auth/register", {
        username,
        firstName,
        lastName,
        email,
        password
      })
  }

}

export default new AuthService();