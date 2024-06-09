
export interface PropsField {
    fieldId: string
    type?: "inputText" | "inputDate" | "inputSelect" | "inputCheck" | "inputRadio"
    label?: string
    description?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    options? : Array<{ label: string; value: string }>;
    children?: Array<PropsField>,
    className? : string 

}