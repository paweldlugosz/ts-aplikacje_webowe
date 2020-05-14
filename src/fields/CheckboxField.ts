import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class CheckboxField implements Field {
    
    name: string;
    label: string;
    type: FieldType = FieldType.Checkbox
    value: boolean;
    htmlElement: HTMLInputElement;

    constructor(name: string, label: string, value: boolean = false) {
        this.name = name;
        this.label = label;
        this.value = value;
    }

    getValue(): boolean {
        return this.htmlElement.checked;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldLabel = new FieldLabel(this.label).render();
        wrapper.appendChild(fieldLabel);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = this.name;
        input.checked = this.value;
        wrapper.appendChild(input);
        this.htmlElement = input;
        return wrapper;
    }

}