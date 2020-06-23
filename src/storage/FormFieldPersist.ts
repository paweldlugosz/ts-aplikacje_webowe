import FieldType from "../fields/FieldType";

export default class FormFieldPersist {

    name: string;
    label: string;
    type: FieldType;
    value: any;

    constructor(name: string, label: string, type: FieldType, value: any) {
        this.name = name;
        this.label = label;
        this.type = type;
        this.value = value;
    }
    
}