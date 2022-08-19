import axios from "axios";
import { BASE_URL_SERVER } from "./server";



const API_ENDPOINT = {
  USER_LOGIN2: "api/v1/accounts/login",
  REGISTER_ACCOUNT: "api/v1/accounts/register"
};

class AccountService {
  getUser2 = async (accessToken) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.USER_LOGIN2)

  }



  registerAccount = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.REGISTER_ACCOUNT, data);
  }









}
const accountService = new AccountService();
export default accountService;