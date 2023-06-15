import axios from "axios";
import {useQuery} from "react-query";
import {IDataItem} from "../types";


const fetchData = async () => {
    const data = await axios.get<IDataItem[]>('http://localhost:3000/data')
    return data.data
}

export const useGetData = () => {
    return useQuery<IDataItem[]>(['all-data'], () => fetchData())
}