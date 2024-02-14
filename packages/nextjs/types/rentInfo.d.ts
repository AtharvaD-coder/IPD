interface RentInfo {
  address: string;
  noOfMonths: number;
  rentof1Month: number;
  depositAmount: number;
  noOfInstallmentsPaid: number;
  feesForLateInstallments: number;
  contractStartTimestamp: number;
  deadline?: number;
}

export { RentInfo };
