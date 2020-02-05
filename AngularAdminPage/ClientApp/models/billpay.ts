export interface Billpay {
    id: number;
    accountNumber: Number;
    payeeId: number;
    amount: number;
    scheduleDate: Date;
    period: string;
    modifyDate: Date;
    blocked: boolean;
}
