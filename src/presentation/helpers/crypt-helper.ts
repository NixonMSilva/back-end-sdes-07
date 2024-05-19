import bcrypt from 'bcrypt'

export class Encrypter {
  private readonly saltRounds: number

  constructor (saltRounds: number) {
    this.saltRounds = saltRounds
  }

  async encrypt (value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltRounds)
  }

  async compare (inputValue: string, compareValue: string): Promise<boolean> {
    return await bcrypt.compare(inputValue, compareValue)
  }
}
