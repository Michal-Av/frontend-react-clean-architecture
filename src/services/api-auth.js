import axios from "axios";

const url = process.env.REACT_APP_URL_AUTH;

export const login = async (username, password) => {
    let details={ email:username, password:password }
    return axios.post(`${url}/login`, details , { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  }

  export const logout = async() => {
    return axios
      .post(`${url}/logout`, {}, { withCredentials: true })
      .then((response) => {
        return response.data;
      });
  }

  export const signup =  async(email, username, password) => {
    let details={ email:email, username: username, password:password }
    return axios
      .post(`${url}/signup`, details )
      .then((response) => {
        return response.data;
      });
  }

