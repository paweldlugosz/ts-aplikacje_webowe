import Form from './Form';
import Field from './fields/Field';
import InputField from './fields/InputField';
import EmailField from './fields/EmailField';
import SelectField from './fields/SelectField';
import CheckboxField from './fields/CheckboxField';
import TextAreaField from './fields/TextAreaField';
import Storage from './storage/Storage';
import LocStorage from './storage/LocStorage';
import FieldType from './fields/FieldType';
import DateField from './fields/DateField';

export default class App {

    private form: Form;
    private locStorage: Storage

    constructor() {
        this.locStorage = new LocStorage()
    }

    renderForm(fields: Field[] = this.initSimpleForm()) {
        this.form = new Form(fields);
        document.body.appendChild(this.form.render());
    }

    renderEditForm(id: string) {
        const form = this.locStorage.loadDocument(id);
        const fields: Field[] = [];
        form.fields.forEach(element => {
            switch (element.type) {
                case FieldType.Checkbox:
                    fields.push(new CheckboxField(element.name, element.label, element.value));
                    break;
                case FieldType.Date: 
                    fields.push(new DateField(element.name, element.label, element.value));
                    break;
                case FieldType.Email: 
                    fields.push(new EmailField(element.name, element.label, element.value));
                    break;
                case FieldType.MultilineText: 
                    fields.push(new TextAreaField(element.name, element.label, element.value));
                    break;
                case FieldType.Select: 
                    fields.push(new SelectField(element.name, element.label, element.value));
                    break;
                case FieldType.Text: 
                    fields.push(new InputField(element.name, element.label, element.value));
                    break;
            }
        });
        this.renderForm(fields);
    }

    initSimpleForm(): Field[] {
        const fields: Field[] = [];
        fields.push(new InputField('firstName', 'Imię'));
        fields.push(new InputField('lastName', 'Nazwisko'));
        fields.push(new EmailField('email', 'E-mail'));
        const courses: string[] = ['Informatics', 'Econometrics']
        fields.push(new SelectField('course', 'Wybierz kierunek studiów', courses));
        fields.push(new CheckboxField('elearning', 'Czy preferujesz e-learning?'));
        fields.push(new TextAreaField('comments', 'Uwagi'));
        return fields;
    }
}