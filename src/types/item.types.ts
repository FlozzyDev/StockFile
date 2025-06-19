export interface IItem {
    name: string;
    categoryId: string;
    supplierId: string;
    locationId: string;
    purchaseDate: Date;
    quantity: number;
    price: number;
    imageUrl: string;
    SerialNumber: string;
    warranty: boolean;
    expiration: boolean;
    expirationDate: Date;
    warrantyDate: Date;
    notes: string;
}