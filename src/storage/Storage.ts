import Data from "./Data";

export default interface Storage {

    saveDocument(doc: any): string;

    loadDocument(id: string): Data;

    getDocuments(): string[];

    removeDocument(id: string): void;
}