export interface ISupplier {
    supplierId: number;
    name: string;
    website?: string | null;
    address?: boolean | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    email?: string | null;
    phone?: string | null;
}