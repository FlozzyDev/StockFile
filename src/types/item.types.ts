export interface IItem {
    itemId: number;
    name: string;
    categoryId?: string | null;
    supplierId?: string | null;
    locationId?: string | null;
    purchaseDate?: Date | null;
    quantity?: number | null;
    price?: number | null;
    imageUrl?: string | null;
    SerialNumber?: string | null;
    warranty: boolean;
    expiration: boolean;
    expirationDate?: Date | null;
    warrantyDate?: Date | null;
    notes?: string | null;
}