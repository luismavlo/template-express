import { bcryptAdapter } from '../../config/bcrypt.adapter'
import { generateAccountNumber } from '../../config/generate-account-number'
import { JwtAdapter } from '../../config/jwt.adapter'
import { User } from '../../data'
import { CreateUserDTO, CustomError, LoginUserDTO } from '../../domain'


export class UserService {

  signup = async (createUserDTO: CreateUserDTO) => {
    
    const accountNumber = generateAccountNumber() //TODO 1: explicar detalladamente esta linea

    //TODO 2: explicar detalladamente el codigo de abajo
    const user = new User();
    user.fullname = createUserDTO.name
    user.accountNumber = `${accountNumber}`
    user.password = createUserDTO.password //TODO 3: explicar porque aca no encripte la contraseña, pista revisar el modelo de User
    user.amount = 1000;

    try {
      const userCreated = await user.save()

      return {
        accountNumber: userCreated.accountNumber,
        fullname: userCreated.fullname,
        amout: userCreated.amount
      }
    } catch (error) {
      console.log(error)
      throw CustomError.internalServer('Internal Server Error')
    }
  }

  login = async (loginUserDTO: LoginUserDTO) => {
    //TODO 4: explicar detalladamente el codigo de abajo
    const user = await User.findOne({
      where: {
        accountNumber: loginUserDTO.accountNumber,
        status: true,
      }
    })

    if( !user ) throw CustomError.unAuthorized('Invalid Credentials')
    //TODO 5: explicar detalladamente el codigo de abajo
    const isMatching = bcryptAdapter.compare(loginUserDTO.password, user.password)
    if( !isMatching ) throw CustomError.unAuthorized('Invalid Credentials')
    //TODO 6: explicar detalladamente el codigo de abajo
    const token = await JwtAdapter.generateToken({id: user.id})
    if( !token ) throw CustomError.internalServer('Internal Server Error')

    return {
      token,
      user: {
        accountNumber: user.accountNumber,
        fullname: user.fullname,
        amount: user.amount
      }
    }

  }
  //TODO: explicar detalladamente esta funcion
  findUserByAccountNumber = async (accountNumber: string) => {
    const user = await User.findOne({
      where: {
        accountNumber,
        status: true,
      }
    })

    if( !user ) throw CustomError.notFound('User not found')

    return user
  }

  //TODO: explicar detalladamente esta funcion
  updateUserAmount = async (accountNumber: string, amount: number) => {
    const user = await this.findUserByAccountNumber(accountNumber)

    user.amount = amount;

    try {
      await user.save()

      return {
        ok: true
      }
    } catch (error) {
      throw CustomError.internalServer('Internal Server Error')
    }
  }
  
}