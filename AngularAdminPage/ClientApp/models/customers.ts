export interface Customer {
    id: number;
    customerName: string;
    TFN?: string;
    address?: string;
    city?: string;
    state?: string;
    postCode?: string;
    phone: string;
    locked: boolean;
}
