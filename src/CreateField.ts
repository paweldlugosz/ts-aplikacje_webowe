import FieldType from "./fields/FieldType";
import Field from "./fields/Field";

export default class CreateField {
    
    name: HTMLInputElement;    
    label: HTMLInputElement;
    type: HTMLInputElement

    constructor() {
        this.name = document.createElement('input');
        this.label = document.createElement('input');
        this.type = document.createElement('input');
    }

}