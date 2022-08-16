import axios  from "axios";
import { BASE_URL_SERVER } from "./server";



const API_ENDPOINT = {
  ACCESS_AUTH_TOKEN: "/api/token",
  USER_LOGIN: "/api/v1/accounts/login",
  };

  class AccountService {
    accessAuthToken = async (data) => {
      return await axios.post(
        BASE_URL_SERVER + API_ENDPOINT + ACCESS_AUTH_TOKEN,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    };

    

   
  
  }
  const accountService = new AccountService();
  export default accountService ;