import Form from "../Form";

export default interface Storage {

    saveDocument(form: Form): string;

    loadDocument(id: string, select: boolean): Form;

    getDocuments(): string[];

    removeDocument(id: string): void;
}