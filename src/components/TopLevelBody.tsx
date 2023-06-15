import {ChildTable} from "./ChildTable.tsx";
import {useState} from "react";
import {IDataItem} from "../types.ts";

interface IProps {
    item: IDataItem,
    removeItem: (item: IDataItem) => void
}


export const TopLevelBody = ({item, removeItem}: IProps) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
    const collapseBtnLabel = (): string => {
        if (item.children.has_nemesis && isCollapsed) {
            return '+'
        } else if (item.children.has_nemesis && !isCollapsed) {
            return '-'
        } else {
            return ''
        }
    }

    return (
        <tbody>
        <tr>
            <td>
                <button onClick={() => setIsCollapsed(prev => !prev)} className='w-4 h-4'>{collapseBtnLabel()}</button>
            </td>
            {Object.values(item.data).map((value, index) => <td key={index}>{value}</td>)}
            <td>
                <button onClick={() => removeItem(item)} className='text-red-600 font-bold'>X</button>
            </td>
        </tr>
        {item.children.has_nemesis ? <ChildTable item={item} isCollapsed={isCollapsed}/> : null}
        </tbody>
    )
}