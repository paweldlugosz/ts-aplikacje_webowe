import  FieldType from './FieldType'

export default interface Field {
    
    name: string;
    label: string;
    type: FieldType;
    value: any;

    render(): HTMLElement;
    
}