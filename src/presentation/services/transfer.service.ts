import { Transfer } from '../../data'
import { CustomError, createTransferDTO } from '../../domain'
import { UserService } from './user.service'


export class TransferService {

  constructor(
    private readonly userService: UserService 
  ) {
    
  }

  makeTransfer = async (createTransferDTO: createTransferDTO) => {
    //TODO 7: explicar detalladamente porque se hace esta validacion
    if( createTransferDTO.senderAccountNumber === createTransferDTO.destinationAccountNumber ){
      throw CustomError.badRequest('Sender and Destination Account Numbers cannot be the same')
    }
    //TODO 8: explicar que hace el codigo de abajo
    const senderAccountPromise = this.userService.findUserByAccountNumber(createTransferDTO.senderAccountNumber)
    //TODO 9: explicar que hace el codigo de abajo
    const destinationAccountPromise = this.userService.findUserByAccountNumber(createTransferDTO.destinationAccountNumber)
    //TODO 10: explicar porque no se le coloque await arriba a los dos codigos y que hace el codigo de abajo
    const [senderAccount, destinationAccount] = await Promise.all([senderAccountPromise, destinationAccountPromise])
    //TODO 11: explicar para que se hace la validacion de abajo
    if(senderAccount.amount < createTransferDTO.amount){
      throw CustomError.badRequest('Insufficient funds')
    }
    //TODO 12: explicar las dos lineas de codigo de abajo
    const amountSenderUser = senderAccount.amount - createTransferDTO.amount;
    const amountDestinationUser = destinationAccount.amount + createTransferDTO.amount;

    //TODO 13: explicar el codigo de abajo
    const updateUserSenderPromise = this.userService.updateUserAmount(createTransferDTO.senderAccountNumber, amountSenderUser);
    const updateUserDestinationPromise = this.userService.updateUserAmount(createTransferDTO.destinationAccountNumber, amountDestinationUser)
    const createTransferPromise = this.createRecordTransfer(createTransferDTO.amount, senderAccount.id, destinationAccount.id)

    try {
      //TODO 14: explicar porque se hace el codigo de abajo
      return await Promise.all([updateUserSenderPromise, updateUserDestinationPromise, createTransferPromise])
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error')
    }
  }
  

  createRecordTransfer = async (amount: number, senderUserId: number, destinationUserId: number) => {
    const transfer = new Transfer()

    transfer.amount = amount;
    transfer.senderUserId = senderUserId;
    transfer.receiverUserId = destinationUserId;

    try {
      await transfer.save()

      return {
        ok: true
      }
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error')
    }
  }
  
}