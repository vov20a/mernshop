export interface ICategory {
    _id: string;
    id: string;
    title: string;
    parentCategory: ICategory;
    createdAt: Date;
    updatedAt: Date;
}