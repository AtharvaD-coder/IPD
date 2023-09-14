class Rentinfo {
    address: string;
    noOfMonths: number;
    rentof1Month: number;
    depositAmount: number;
    noOfInstallmentsPaid: number;
    feesForLateInstallments: number;
    contractStartTimestamp: number;

    constructor(data: any[]) {
        if (data.length !== 7) {
            throw new Error('Invalid data array length');
        }

        this.address = data[0];
        this.noOfMonths = parseInt(data[1]);
        this.rentof1Month = parseInt(data[2]);
        this.depositAmount = parseInt(data[3]);
        this.noOfInstallmentsPaid = parseInt(data[4]);
        this.feesForLateInstallments = parseInt(data[5]);
        this.contractStartTimestamp = parseInt(data[6]);
    }
}

export default Rentinfo;
