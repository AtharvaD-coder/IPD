


    

class Rentproposal {
    rentee: string;
    noOfMonths: number;
    depositBalance: number;
    
    constructor(data: any[]) {
        if (data.length !== 3) {
            throw new Error('Invalid data array length');
        }

        this.rentee = data[0];
        this.noOfMonths = parseInt(data[1]);
      
        this.depositBalance = parseInt(data[2]);
   
    }
}

export default Rentproposal;
