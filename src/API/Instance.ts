import { create } from 'apisauce';
import { BASE_URL } from 'constants/Constants';
const baseInstance = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'tr',
  },
});

const urlEncodedInstance = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Language': 'tr',
  },
});

const formDataInstance = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept-Language': 'tr',
  },
});

function setAuthorizationHeader(token: string) {
  baseInstance.setHeader('Authorization', `Bearer ${token}`);
  urlEncodedInstance.setHeader('Authorization', `Bearer ${token}`);
  formDataInstance.setHeader('Authorization', `Bearer ${token}`);
}

async function setBaseURL(baseURL: string) {
  baseInstance.setBaseURL(baseURL);
  urlEncodedInstance.setBaseURL(baseURL);
  formDataInstance.setBaseURL(baseURL);
}

async function GET<T>(endpoint: string, params?: any, timeout?: number): Promise<T> {
  return new Promise((resolve, reject) => {
    if (params) {
      let data = new URLSearchParams();
      Object.keys(params).forEach(key => {
        data.append(key, params[key]);
      });
      urlEncodedInstance
        .get(endpoint, data, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error.data);
        });
    } else {
      baseInstance
        .get(endpoint, undefined, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error.data);
        });
    }
  });
}
async function POST<T>(
  endpoint: string,
  params?: any,
  formData?: boolean,
  timeout?: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (formData) {
      formDataInstance
        .post(endpoint, params, timeout ? { timeout: timeout } : undefined)
        .then(response => {
          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error.data);
        });
    } else {
      baseInstance
        .post(endpoint, params, timeout ? { timeout: timeout } : undefined)
        .then(response => {

          if (response.ok) {
            resolve(<T>response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(error => {
          reject(error.data);
        });
    }
  });
}

async function PUT<T>(endpoint: string, params?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    baseInstance
      .put(endpoint, params)
      .then(response => {
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {

        reject(error.data);
      });
  });
}
async function DELETE<T>(endpoint: string, params?: any): Promise<T> {
  return new Promise((resolve, reject) => {
    baseInstance
      .delete(endpoint, {}, { data: params })
      .then(response => {
        if (response.ok) {
          resolve(<T>response.data);
        } else {
          reject(response.data);
        }
      })
      .catch(error => {
        reject(error.data);
      });
  });
}

const API = {
  setAuthorizationHeader,
  setBaseURL,
  GET,
  PUT,
  POST,
  DELETE,
};

export default API;
