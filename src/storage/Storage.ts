export default interface Storage {

    saveDocument(doc: any): string;

    loadDocument(id: string): any;

    getDocuments(): string[];
}