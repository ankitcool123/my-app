import { useRecoilState } from "recoil"
import { authUserAtom } from "../state"
import axios, { AxiosRequestConfig } from "axios";

export const General = () => {
  const [authUser]: any = useRecoilState(authUserAtom);
  const apiCall = async (method: string, fnApi: string, apiParm: any = {}, token: any = null, data?: any) => {
    const apiHeaderapicall: AxiosRequestConfig<any> = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : authUser.token}`
      }
    }

    if (method === "POST") {
      try {
        const result = await axios.post(fnApi, apiParm, apiHeaderapicall);
        return result;
      } catch (error: any) {
        let errResponse = error.toJSON();
        if (errResponse.status === 401) {
        }
      }

    }

    if (method === "GET") {
      try {
        const result = await axios.get(fnApi, apiHeaderapicall);
        return result;
      } catch (error: any) {
        let errResponse = error.toJSON();
        if (errResponse.status === 401) {
        }
      }

    }

    if (method === "PUT") {
      try {
        const result = await axios.put(fnApi, apiParm, apiHeaderapicall);
        return result;
      } catch (error: any) {
        let errResponse = error.toJSON();
        if (errResponse.status === 401) {
        }
      }

    }

    if (method === "DELETE") {
      try {
        const result = await axios.delete(fnApi, apiParm);
        return result;
      } catch (error: any) {
        let errResponse = error.toJSON();
        if (errResponse.status === 401) {
        }
      }

    }

  }

  return {
    apiCall,
  };
};