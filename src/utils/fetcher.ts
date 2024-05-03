import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE_KEY, ROUTE_PATHS } from 'constants-es';
import { LocalStoreKey } from 'constants-es/local-store';

import { message } from 'antd';
import { isEmpty } from 'lodash';

import { getAuth, setAuth } from 'helpers/auth';
import { getLocalStore } from 'helpers/local-store';
import refreshToken from 'modules/auth/data/queries/use-mutation-refresh-token/fetch';

import ChangeCase from './change-case'


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
 
  // timeout: 20000,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.REACT_APP_API_KEY,
  
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status > 300 || response.status < 200) {
      const newResponse:any =  {
        ...response,
        data:{
          data:null,
          status: response.status,
          message:response.data.error_description || response.data.msg,
          error:response.data.error ||  response.data,
          success: false
        }
      }
      
      return Promise.reject(
        new Error(ChangeCase.object.toCamelCase(newResponse)),
      )
    }
    const newResponse:AxiosResponse =  {
      ...response,
      data:{
        data:response.data,
        status: response.status,
        message:"Request Success" ,
        error:null,
        success: true
      }
    }
   
    
    return ChangeCase.object.toCamelCase(newResponse)
  },
  async (error) => {
  

    // return Promise.reject(new Error(error.message))
      // if(error.response?.status === 401 && ![ROUTE_PATHS.SIGN_IN, ROUTE_PATHS.RECOVERY_PASSWORD].includes(window.location.pathname)){
      //   message.error("Session Expired")
      //   localStorage.clear()
      //   window.location.href = ROUTE_PATHS.SIGN_IN
        
      //   return;
      // }
    if(error.response?.status === 401 && ![ROUTE_PATHS.SIGN_IN, ROUTE_PATHS.RECOVERY_PASSWORD].includes(window.location.pathname)){
       await refreshToken(getLocalStore(LocalStoreKey.RefreshTokenLocalStoreKey)).then((response:any) => {
        if(!!response?.data?.accessToken){
          setAuth(response?.data?.accessToken)
          localStorage.setItem(LocalStoreKey.RefreshTokenLocalStoreKey, response?.data?.refreshToken)
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response?.data?.accessToken}`;
          // window.location.reload()
        }else{
          message.error("Session Expired")
          localStorage.clear()
          window.location.href = ROUTE_PATHS.SIGN_IN
          axiosInstance.defaults.headers.common["Authorization"] = null;
        }
      }).catch((error) => {
        message.error("Session Expired")
        localStorage.clear()
        window.location.href = ROUTE_PATHS.SIGN_IN
        axiosInstance.defaults.headers.common["Authorization"] = null;
      })
        
    return;
      }

    if (error.response) {
      return Promise.resolve(ChangeCase.object.toCamelCase({
        ...error.response,
        data:{
          success: false,
          data: null,
          message: error.response.data.error_description || error.response.data.msg || error.response.data.message || "Request Failed",
          error:error.response.data
        }
      }))
    }

    return Promise.reject(error)
  },
)

axiosInstance.interceptors.request.use((config) => {
  const auth = getAuth();
  if (auth) {
      config.headers.Authorization = `Bearer ${auth}`;
  }
  if (
    !(config.headers['Content-Type'] as string)?.includes('multipart/form-data')
  ) {
    const script = config.data?.script
    config.data = ChangeCase.object.toSnakeCase(config.data)
    if(!isEmpty(script)){
      config.data.script = script
    }
  }
  const script = config.params?.script
  config.params = ChangeCase.object.toSnakeCase(config.params)
  if(!isEmpty(script)){
    config.params.script = script
  }

  return config
})

export default axiosInstance
