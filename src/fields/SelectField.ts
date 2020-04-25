import Field from './Field'
import FieldType from './FieldType'
import FieldLabel from './FieldLabel'

export default class SelectField implements Field {

    name: string;
    label: string;
    type: FieldType = FieldType.Select
    value: string[];
    
    constructor(name: string, label: string, value: string[]) {
        this.name = name;
        this.label = label;
        this.value = value;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        const fieldLabel = new FieldLabel(this.label).render();
        wrapper.appendChild(fieldLabel);
        const input = document.createElement('select');
        for (let i = 0; i < this.value.length; i++) {
            const option = document.createElement('option');
            option.value = option.innerText = this.value[i]
            input.appendChild(option)
        }
        wrapper.appendChild(input);
        return wrapper;
    }

}