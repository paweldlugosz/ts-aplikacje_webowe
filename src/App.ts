import Form from './Form';
import Field from './fields/Field';
import InputField from './fields/InputField';
import EmailField from './fields/EmailField';
import SelectField from './fields/SelectField';
import CheckboxField from './fields/CheckboxField';
import TextAreaField from './fields/TextAreaField';

class App {

    body: HTMLElement;
    form: Form;

    constructor() {
        this.body = document.body;
        this.form = new Form(this.initSimpleForm());
    }

    start() {
        this.body.appendChild(this.form.render())
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

const app = new App();
app.start()