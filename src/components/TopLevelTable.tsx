import {useGetData} from "../hooks/useGetData";
import {TopLevelBody} from "./TopLevelBody.tsx";
import React, {useEffect, useState} from "react";
import {IDataItem} from "../types.ts";

export const TopLevelTable = () => {
    const {data, isLoading, isError, error} = useGetData();
    const [filteredData, setFilteredData] = useState<IDataItem[]>([])

    useEffect(() => {
        setFilteredData(data ? [...data] : [])
    }, [data])

    const removeItem = (itemToRemove: IDataItem) => {
        setFilteredData(filteredData.filter(item => item.data.ID !== itemToRemove.data.ID))
    }

    if (isLoading)
        return <div className="mt-24 text-center text-2xl">Loading...</div>;

    if (isError)
        return (
            <div className="mt-24 text-center text-2xl">
                {(error as Error).message}
            </div>
        );

    if (filteredData.length > 0) {
        return (
            <table>
                <thead>
                <tr>
                    <th></th>
                    {Object.keys(filteredData[0].data).map(key => <th key={key}>{key}</th>)}
                    <th>Delete</th>
                </tr>
                </thead>
                {filteredData.map((item, index) => (
                    <TopLevelBody key={index} item={item} removeItem={removeItem}/>
                ))}
            </table>
        )
    } else {
        return <h1 className="text-center">No data, refresh for reload table</h1>
    }
}