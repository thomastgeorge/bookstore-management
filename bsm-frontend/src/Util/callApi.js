import myApi from  './apiGodFile'

const callAPI = {
  get: async(url, params) => {
    try {
      let reqURL = url;

      if (params) {
        reqURL = reqURL + "?";
        reqURL = Object.keys(params).reduce((acc, curr) => {
            if (params[curr] !== null) {
                return `${acc}${curr}=${params[curr]}&`;
            }
            return acc;
        }, reqURL);
      }

      const response = await myApi({
        method: "GET",
        url: reqURL,
      });

      return response
    } catch (error) {
      console.error('Error during GET API call:', error);
      return false;
    }
  },

  post: async(url, body) => {
    try {
      const response = await myApi({
        method: "POST",
        url: url,
        data: body,
      });

      return response;
    } catch (error) {
      console.error('Error during POST API call:', error);
      return false;
    }
  },

  put: async(url, body) => {
    try {
      const response = await myApi({
        method: "PUT",
        url: url,
        data: body,
      });

      return response;
    } catch (error) {
      console.error('Error during PUT API call:', error);
      return false;
    }
  },

  patch: async(url,body) => {
    try {
      const response = await myApi({
        method: "PATCH",
        url: url,
        data: body,
      });

      return response;
    } catch (error) {
      console.error('Error during PATCH API call:', error);
      return false;
    }
  },

  delete: async(url) => {
    try {
      const response = await myApi({
        method: "DELETE",
        url: url,
      });

      return response;
    } catch (error) {
      console.error('Error during DELETE API call:', error);
      return false;
    }
  },

}

export default callAPI;