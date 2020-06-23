import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class DateField implements Field {
    
    name: string;
    label: string;
    type: FieldType;
    value: string;
    htmlElement: HTMLInputElement;

    constructor(name: string, label: string, value: string = '2020-01-01') {
        this.type = FieldType.Date
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
        input.type = 'date'
        input.value = this.value;
        wrapper.appendChild(input);
        this.htmlElement = input;
        return wrapper;
    }

}