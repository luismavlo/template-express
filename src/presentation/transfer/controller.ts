



import { Request, Response } from 'express';
import { CustomError, createTransferDTO } from '../../domain';
import { TransferService } from '../services/transfer.service';

export class TransferController {

  constructor(
    private readonly transferService: TransferService
  ){}

  private handleError = (error: unknown, res: Response) => {
    if( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json({ message: 'Something went very wrong! 🧨' })
  }

  makeTransfer = async (req: Request, res: Response) => {
    const [error, createTransfer] = createTransferDTO.create(req.body);
    if( error ) return res.status(422).json({ message: error })

    this.transferService.makeTransfer(createTransfer!)
      .then(transfer => res.status(201).json({
        message: 'transfer created successfully'
      }))
      .catch(error => this.handleError(error, res))
  }

}