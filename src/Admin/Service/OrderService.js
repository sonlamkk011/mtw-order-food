import axios from 'axios';
const BASE_URL_SERVER = 'https://order-foods.herokuapp.com'


const API_ENDPOINT = {
  GET_LIST: "/api/v1/orders",
  GET_DETAILS: "/api/v1/orders/",
  UPDATE_DETAILS: "/api/v1/orders/",
  CREATE_NEW: "/api/v1/orders/create",
  DELETE: "/api/v1/orders/delete/",
}



class OrderService {

  getOrderList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST);
  };

  getOrderDetails = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id
    );
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
    );
  };

  createNew = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data);
  };

  deleteFood = async (id) => {
    return await axios.put(BASE_URL_SERVER + API_ENDPOINT.DELETE + "/" + id);
  }


}

const orderService= new OrderService();
export default orderService;

