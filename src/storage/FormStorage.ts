import FormEntity from "./FormEntity";
import NameIdPair from "./NameIdPair";

export default interface FormStorage {

    saveForm(form: FormEntity): void

    getFormList(): NameIdPair[]

    getForm(id: string): FormEntity

}