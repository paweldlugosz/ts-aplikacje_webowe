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
import FormStorage from './storage/FormStorage';
import FormStorageImpl from './storage/FormStorageImpl';

export default class App {

    private form: Form;
    private locStorage: Storage
    private formStorage: FormStorage;

    constructor() {
        this.locStorage = new LocStorage()
        this.formStorage = new FormStorageImpl();
    }

    renderForm(id: string) {
        this.form = this.formStorage.getForm(id);
        document.body.appendChild(this.form.render());
    }

    renderEditForm(id: string) {
        const form: Form = this.locStorage.loadDocument(id, true);
        document.body.appendChild(form.render());
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