import {ChildBody} from "./ChildBody.tsx";
import {useState} from "react";
import {IDataItem, INemesisRecord} from "../types.ts";

interface IProps {
    item: IDataItem
    isCollapsed: boolean
}

export const ChildTable = ({item, isCollapsed}: IProps) => {
    const [filteredItem, setFilteredItem] = useState<IDataItem>(item)

    const removeItem = (itemToRemove) => {
        setFilteredItem(prevData => {
            let updatedRecords: INemesisRecord[] = []
            if (prevData.children.has_nemesis) {
                updatedRecords = prevData.children.has_nemesis.records.filter(item => item.data.ID !== itemToRemove.data.ID)
            }
            return {
                ...prevData,
                children: {
                    ...prevData.children,
                    has_nemesis: {
                        ...prevData.children.has_nemesis,
                        records: updatedRecords
                    }
                }
            }
        })
    }

    if (filteredItem.children.has_nemesis && filteredItem.children.has_nemesis.records.length > 0 && !isCollapsed) {
        return (
            <tr>
                <td colSpan={Object.keys(filteredItem.data).length}>
                    <table className='nemesis-table'>
                        <thead>
                        <tr>
                            <th></th>
                            {Object.keys(filteredItem.children.has_nemesis.records[0].data).map(key =>
                                <th key={key}>{key}</th>)}
                            <th>Delete</th>
                        </tr>
                        </thead>
                        {filteredItem.children.has_nemesis.records.map(record => (
                            <ChildBody data={record} key={record.data.ID} removeItem={removeItem} isSecrete={true}/>
                        ))}
                    </table>
                </td>
            </tr>
        )
    }
}