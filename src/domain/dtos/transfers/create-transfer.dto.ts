



export class createTransferDTO {
  private constructor(
    public readonly amount: number,
    public readonly senderAccountNumber: string,
    public readonly destinationAccountNumber: string
  ){}

 
  static create( object: { [key : string] : any } ): [string?, createTransferDTO?] {
    const { amount, senderAccountNumber, destinationAccountNumber } = object;

    if( !amount ) return ['amount is required']
    if( !senderAccountNumber ) return ['senderAccountNumber is required']
    if( !destinationAccountNumber ) return ['destinationAccountNumber is required']
    return [undefined, new createTransferDTO(amount, senderAccountNumber, destinationAccountNumber)]
  }
}
