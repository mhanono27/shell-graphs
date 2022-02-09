import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

import {User, LiquidityPosition} from '../generated/schema'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export const zeroAddress = '0x0000000000000000000000000000000000000000'

export function createLiquidityPosition(exchange: Address, user: Address): LiquidityPosition {
  let id = exchange
    .toHexString()
    .concat('-')
    .concat(user.toHexString())
  let liquidityTokenBalance = LiquidityPosition.load(id)
  if (liquidityTokenBalance === null) {
    liquidityTokenBalance = new LiquidityPosition(id)
    liquidityTokenBalance.liquidityTokenBalance = ZERO_BD
    liquidityTokenBalance.user = user.toHexString()
    liquidityTokenBalance.save()
  }
  return liquidityTokenBalance as LiquidityPosition
}

export function createUser(address: Address): User {
  let user = User.load(address.toHexString())
  if (user === null) {
    user = new User(address.toHexString())
    user.usdSwapped = ZERO_BD
    user.counter = ZERO_BI
    user.liquidityPositions = new Array<string>();
    user.save()
  }
  return user
}

export function decimalize ( int_amount: BigInt, decimals: i32) : BigDecimal {
  let scaled_decimal = BigInt.fromI32(10).pow( u8(decimals) ).toBigDecimal()
  let val = int_amount.toBigDecimal()
  return val.div(scaled_decimal)
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