import {useState} from "react";

// TODO: IProps typescript
export const ChildBody = ({data, removeItem}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
    const [filteredData, setFilteredData] = useState(data)

    const collapseBtnLabel = (): string => {
        if (filteredData.data && isCollapsed && filteredData.children.has_secrete) {
            return '+'
        } else if (filteredData.data && !isCollapsed && filteredData.children.has_secrete) {
            return '-'
        } else if (!filteredData.children) {
            return ''
        }
    }

    const removeSecrete = (itemToRemove) => {
        setFilteredData(prevData => {
            const updatedRecords = prevData.children.has_secrete.records.filter(item => item.data.ID !== itemToRemove.data.ID)
            return {
                ...prevData,
                children: {
                    ...prevData.children,
                    has_secrete: {
                        ...prevData.children.has_secrete,
                        records: updatedRecords
                    }
                }
            }
        })
    }

    return (
        <>
            <tbody>
            <tr>
                <td>
                    <button onClick={() => setIsCollapsed(prev => !prev)}>{collapseBtnLabel()}</button>
                </td>
                {Object.values(filteredData.data).map((value, index) =>
                    <td key={index}>{value}</td>)}
                <td>
                    <button onClick={() => removeItem(filteredData)} className='text-red-600 font-bold'>X</button>
                </td>
            </tr>
            {filteredData.children.has_secrete && filteredData.children.has_secrete.records.length > 0 && !isCollapsed ?
                <tr>
                    <td colSpan={Object.keys(filteredData.data).length}>
                        <table className='secrete-table'>
                            <thead>
                            <tr>
                                <th></th>
                                {Object.keys(filteredData.children.has_secrete.records[0].data).map(key =>
                                    <th key={key}>{key}</th>)}
                                <th>Delete</th>
                            </tr>
                            </thead>
                            {filteredData.children.has_secrete.records.map(record => (
                                <ChildBody data={record} key={record.data.ID} removeItem={removeSecrete}/>
                            ))}
                        </table>
                    </td>
                </tr> : null
            }
            </tbody>
        </>
    )
}