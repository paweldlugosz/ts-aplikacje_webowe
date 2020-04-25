import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class TextAreaField implements Field {

    name: string;
    label: string;
    type: FieldType;
    value: string;

    constructor(name: string, label: string, value: string = '') {
        this.name = name;
        this.label = label;
        this.value = value;
    }
    
    render(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldLabel = new FieldLabel(this.label).render();
        wrapper.appendChild(fieldLabel);
        const input = document.createElement('textarea');
        input.rows= 4;
        input.cols= 50;
        wrapper.appendChild(input);
        return wrapper;
    }

}