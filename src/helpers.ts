import { ethereum, Address, BigDecimal, BigInt, log } from "@graphprotocol/graph-ts"

import { shell } from "../generated/shell/Shell"
import { ERC20 } from "../generated/shell/ERC20"
import { cERC20 } from "../generated/shell/cERC20"

import {
    Transaction,
    Token, 
    User,
    Pool
} from "../generated/schema"

export const SHELL: string = "0x8f26D7bAB7a73309141A291525C965EcdEa7Bf42"
export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export function getPool () : Pool{
    let pool = Pool.load(SHELL)
    if (pool == null) pool = new Pool(SHELL) 
    return pool
}
export function saveTransaction (_tx: ethereum.Transaction) : void {
    let hash = _tx.hash.toHexString()
    let tx = new Transaction(hash)
    tx.id = hash
    tx.gasUsed = _tx.gasUsed
    tx.gasPrice = _tx.gasPrice
    tx.save()
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString('1')
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
      bd = bd.times(BigDecimal.fromString('10'))
    }
    return bd
  }

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
    if (exchangeDecimals == ZERO_BI) {
      return tokenAmount.toBigDecimal()
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
  }

  export function createUser(address: Address): void {
    let user = User.load(address.toHexString())
    if (user === null) {
      user = new User(address.toHexString())
      user.usdSwapped = ZERO_BD
      user.save()
    }
  }

  export function decimalize ( int_amount: BigInt, decimals: i32) : BigDecimal {
    let scaled_decimal = BigInt.fromI32(10).pow( u8(decimals) ).toBigDecimal()
    let val = int_amount.toBigDecimal()
    return val.div(scaled_decimal)
}

export function getDecimalAmount( address: string , int_amount : BigInt ) : BigDecimal {
    let decimals = Token.load( address ).decimals
    // let decimals = token.decimals
    return decimalize(int_amount, decimals)
} 
  
export function getNumeraireAmount( address: string , int_amount : BigInt ) : BigDecimal {
    let decimals = Token.load( address ).decimals
    // let decimals = token.decimals.toI32()
    return decimalize(int_amount, decimals)


