import Field from './fields/Field';

export default class Form {

    fields: Field[]

    constructor(fields: Field[]) {
        this.fields = fields;
    }

    getValue(): Field[] {
        return this.fields;
    }

    render(): HTMLElement {
        const wrapper = document.createElement('div');
        for (let i = 0; i < this.fields.length; i++) {
            wrapper.appendChild(this.fields[i].render())
        }
        return wrapper;
    }
}