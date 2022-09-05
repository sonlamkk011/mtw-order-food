import { async } from "@firebase/util";

const { default: axios } = require("axios");
const BASE_URL_SERVER = "http://13.213.7.133/";

const API_ENDPOINT = {
  SHOPPING_CART: "api/v1/carts",
  CREATE_ORDER: "api/v1/orders",
  ACCESS_AUTH_TOKEN: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZmlyc3ROYW1lIjoiUGluZGlhcyIsImxhc3ROYW1lIjoiQWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpc3MiOiJNZXRhd2F5aG9sZGluZ3MiLCJleHAiOjE2NjI5NDY3NjgsImVtYWlsIjoiZGFjYWRtaW5AZ21haWwuY29tIn0.JYZM0ABrYtXi09gHKY3ySaLofsqDfn_Wp4T0vMxdtO8",
}


class PublicService {

  shoppingCart = async (options) => {
    // const config = {
    //   // method: "POST",
    //   headers: {
    //     'Authorization': `Bearer ${API_ENDPOINT.ACCESS_AUTH_TOKEN}` 
    //   },

    // }
    // try {
    //   return await axios.post(BASE_URL_SERVER + API_ENDPOINT.SHOPPING_CART,options,config);
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const res = await fetch(BASE_URL_SERVER + API_ENDPOINT.SHOPPING_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${API_ENDPOINT.ACCESS_AUTH_TOKEN}`
        },
        body: JSON.stringify(options)
      });
      console.log('carts',res);
    } catch (error) {
      console.log(error);
    }

  };

  createOrder = async (options) => {
    try {

      return await fetch(BASE_URL_SERVER + API_ENDPOINT.CREATE_ORDER, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${API_ENDPOINT.ACCESS_AUTH_TOKEN}`
        },
        body: JSON.stringify(options)
      });

     
    } catch (error) {
      console.log('error',error);
      return null;
    }



  }
}

const   publicService = new PublicService();
export default publicService;





