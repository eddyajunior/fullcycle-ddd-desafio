export default interface RepositoryInterface<T> {

    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    // delete(id: number): Promise<void>;
    findAll(): Promise<T[]>;
    find(id: string): Promise<T>;
}