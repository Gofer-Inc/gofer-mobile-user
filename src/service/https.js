import axios from 'axios'
import { Preferences } from "@capacitor/preferences";
import { useDataStore } from "@/stores/data";
import apis from '@/service/apis'


const setToken = async () => {
      const {value} = await Preferences.get({ key: "token" });
      return value;
  };


axios.defaults.baseURL = 'https://gofer-api-tnjm.onrender.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const parseParams = async (params, extraHeaders) => {
    const  token  = await setToken();
    const AUTH_TOKEN = `Bearer ${token}`

      return {
        headers: {
          ...extraHeaders,
          'Authorization':AUTH_TOKEN
        },
        params: {
          ...params,
        },
      }
    }

const processError = async function (e) {
  // TODO: add popup
  const status = e.status
  if (status === 404 || e.data === '') {
    //
  }
  if (status === 401) {
    console.log(e)
    //
  } else {
    //
  }
}

const apiCall = function (url, httpMethod, body, additionalParams) {


  switch (httpMethod) {
    case 'post':
    case 'put':
    case 'patch':
      return axios[httpMethod](url, body, additionalParams)
    case 'get':
      return axios[httpMethod](url, additionalParams)
    case 'delete':
      return axios[httpMethod](url, {
        ...additionalParams,
      })
    default:
      return axios[httpMethod](url)
  }
}

const http = async function ({endpoint, suffix, httpMethod, body = undefined, additionalParams = {}, extraHeaders = {}, storeKey }) {

const store = useDataStore();
let url = apis[endpoint]

if(suffix){
    url = `${url}/${suffix}`
}

  try {
    const { data } = await apiCall(
      url,
      httpMethod,
      body,
      await parseParams(additionalParams, extraHeaders)
    )

    if(storeKey){
        store.$patch({
            [storeKey]: data,
        });
    }

    console.log('User',store.getUser)
    return data
  } catch (error) {
    processError(error.response)
    return Promise.reject(error)
  }
}

export default http

    