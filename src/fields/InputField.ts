import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class InputField implements Field {

    name: string;    
    label: string;
    type: FieldType = FieldType.Text
    value: string;
    htmlElement: HTMLInputElement;

    constructor(name: string, label: string, value: string = '') {
        this.name = name;
        this.label = label;
        this.value = value;
    }

    getValue(): string {
        return this.htmlElement.value;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldLabel = new FieldLabel(this.label).render();
        wrapper.appendChild(fieldLabel);
        const input = document.createElement('input');
        input.type = 'text'
        wrapper.appendChild(input);
        this.htmlElement = input;
        return wrapper;
    }

}