import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../config/axios config";
import { AxiosRequestConfig } from "axios";

interface IAuthenticatedQuery{
    querykey: string[];
    url: string;
    config?: AxiosRequestConfig;
}

const UseAuthenticatedQuery = ({querykey,url,config} : IAuthenticatedQuery) => {
return useQuery({
  queryKey: querykey,
  queryFn:async() =>{
    const {data}= await axiosinstance.get(url, config)
    return data;
  }
})
}

export default UseAuthenticatedQuery;
