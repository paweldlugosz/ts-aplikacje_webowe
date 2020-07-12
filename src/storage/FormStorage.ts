import FormEntity from "./FormEntity";
import NameIdPair from "./NameIdPair";
import Form from "../Form";

export default interface FormStorage {

    saveForm(form: FormEntity): void

    getFormList(): NameIdPair[]

    getForm(id: string): Form

}