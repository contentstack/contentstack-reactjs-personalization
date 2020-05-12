// Helper function

import axios from "axios";

export function getData(url) {
  let header_data = {
    headers: {
      api_key: process.env.REACT_APP_API_KEY,
      access_token: process.env.REACT_APP_ACCESS_TOKEN // mention your delivery token with variable as access_token
    }
  };
  return axios.get(url, header_data);
}
