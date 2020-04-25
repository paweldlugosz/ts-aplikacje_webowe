import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class CheckboxField implements Field {
    
    name: string;
    label: string;
    type: FieldType = FieldType.Checkbox
    value: boolean;

    constructor(name: string, label: string, value: boolean = false) {
        this.name = name;
        this.label = label;
        this.value = value;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldLabel = new FieldLabel(this.label).render();
        wrapper.appendChild(fieldLabel);
        const input = document.createElement('input');
        input.name = this.name;
        input.checked = this.value;
        const label = document.createElement('label');
        label.innerText = this.label;
        return wrapper;
    }

}