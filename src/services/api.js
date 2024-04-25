// api.js
import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;
const auto = process.env.REACT_APP_URL_AUTO;
const current = process.env.REACT_APP_URL_CURRENT;
const forcast = process.env.REACT_APP_URL_FORCAST;
const localFav = process.env.REACT_APP_URL_LOCALHOST;

/**
 * 
 * @param {string} text 
 * @returns list of city weather by text from autocomplete API
 */
export const searchCities = async (text) => {
    return axios.get(auto, {
        params: { key: key, q: text }
    });
};

/**
 * 
 * @param {string} cityName 
 * @returns city weather by name from currentCity API
 */
export const getCurrentWeather = async (cityName) => {
    return axios.get(current, { params: { key: key, q: cityName } });
};

/**
 * 
 * @param {string} cityName 
 * @returns forcast for 5 days by city name from forcast API
 */
export const get5DayForecast = async (cityName) => {
    return axios.get(forcast, { params: { key: key, q: cityName, days: 5 } });
};


/**
 * @returns favorites cities 
 *   from localhost server port 8000
 */
export const addToFavorites = async (cityData) => {
    try {
      const response = await axios.post(localFav, cityData);
      return response.data;
    } catch (error) {
      console.error('Error adding city to favorites:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

export const getAllFavorites = async () => {
    return axios.get(localFav);
}

/**
 * 
 * @param {object} cityId 
 * @param {object} data 
 * @returns update obj by cityId with data in the local server 
 */
export const UpdateFavorite = async (cityId, data) => {
    try {
        console.log("City ID:", cityId);
        const response = await axios.put(localFav + cityId, data);
        return response.data;
    } catch (error) {
        console.error('Error updating city:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};

/**
 * 
 * @param {object} id
 * delete obj by id from the local server 
 */
export const deleteFavorites = async (id) => {
    try {
        await axios.delete(localFav + id);
        console.log("Successfully deleted favorite with id:", id);
    } catch (error) {
        console.error("Error deleting favorite:", error);
        throw error; // Rethrow the error to handle it in the calling component
    }
};