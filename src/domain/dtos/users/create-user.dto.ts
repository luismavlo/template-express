




export class CreateUserDTO {
  private constructor(
    public readonly name: string,
    public readonly password: string
  ){}

 
  static create( object: { [key : string] : any } ): [string?, CreateUserDTO?] {
    const { name, password } = object;

    if( !name ) return ['name is required']
    if( !password ) return ['password is required']
    

    return [undefined, new CreateUserDTO(name, password)]
  }
}
