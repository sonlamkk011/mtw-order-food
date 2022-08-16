import axios from 'axios';
const BASE_URL_SERVER = 'https://order-foods.herokuapp.com'


const API_ENDPOINT = {
  GET_LIST: "/api/v1/categories/list",
  GET_DETAILS: "/api/v1/categories/",
  UPDATE_DETAILS: "/api/v1/categories/",
  CREATE_NEW: "/api/v1/categories/create",
  DELETE: "/api/v1/categories/delete",
}



class CategoryService {

  getCategoryList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LIST);
  };

  getCategoryDetails = async (id) => {
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

  delete = async (id) => {
    return await axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE + id);
  }

}

const categoryService = new CategoryService();
export default categoryService;

