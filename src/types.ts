export interface IDataItem {
    data: IPersonData,
    children: {
        has_nemesis?: {
            records: INemesisRecord[]
        }
    }
}

export interface IPersonData {
    ID: string,
    Name: string,
    Gender: string,
    Ability: string,
    ["Minimal Distance"]: string,
    Weight: string,
    Born: string,
    ["In Space Since"]: Date,
    ["Beer consumption (l/y)"]: string,
    ["Knows The Answer?"]: string,
}

export interface INemesisRecord {
    data: INemesisData
    children: INemesisChildren
}

export interface INemesisData {
    ID: string,
    ["Character ID"]: string,
    ["Is Alive"]: string
    Years: string
}

export interface INemesisChildren {
    has_secrete?: {
        records: ISecreteRecord[]
    }
}

export interface ISecreteRecord {
    data: ISecreteData
    children: Object
}

export interface ISecreteData {
    ID: string,
    ["Nemesis ID"]: string,
    ["Secrete Code"]: string
}