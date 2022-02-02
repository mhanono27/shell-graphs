import {
  // CriterionCounter,
  DepositCounter,
  WithdrawalCounter,
  TradeCounter,
  TransactionCounter,
  UtilityCounter,
  UtilityTimestamp
} from "../generated/schema"

import { BigInt } from "@graphprotocol/graph-ts"
import { ONE } from "./constants"

// export function countCriterion () : BigInt {
//   let criterionCounter = CriterionCounter.load('1')
//   if (criterionCounter == null) ( criterionCounter = new CriterionCounter('1'), criterionCounter.count = new BigInt(0) )
//   let count = criterionCounter.count
//   count = count.plus(ONE)
//   criterionCounter.count = count
//   criterionCounter.save()
//   return count
// }

export function countDeposit () : BigInt {
  let depositCounter = DepositCounter.load('1')
  if (depositCounter == null) ( depositCounter = new DepositCounter('1'), depositCounter.count = new BigInt(0) )
  let count = depositCounter.count
  count = count.plus(ONE)
  depositCounter.count = count
  depositCounter.save()
  return count
}

export function countTransaction () : BigInt {
  let txCounter = TransactionCounter.load('1')
  if (txCounter == null) ( txCounter = new TransactionCounter('1'), txCounter.count = new BigInt(0) )
  let count = txCounter.count
  count = count.plus(ONE)
  txCounter.count = count
  txCounter.save()
  return count
}

export function countTrade () : BigInt {
  let tradeCounter = TradeCounter.load('1')
  if (tradeCounter == null) ( tradeCounter = new TradeCounter('1'), tradeCounter.count = new BigInt(0) ) 
  let count = tradeCounter.count
  count = count.plus(ONE)
  tradeCounter.count = count
  tradeCounter.save()
  return count
}

export function countUtility () : BigInt {
  let utilityCounter = UtilityCounter.load('1')
  if (utilityCounter == null) ( utilityCounter = new UtilityCounter('1'), utilityCounter.count = new BigInt(0) )
  let count = utilityCounter.count
  count = count.plus(ONE)
  utilityCounter.count = count
  utilityCounter.save()
  return count
}

export function countWithdrawal () : BigInt {
  let withdrawalCounter = WithdrawalCounter.load('1')
  if (withdrawalCounter == null) ( withdrawalCounter = new WithdrawalCounter('1'), withdrawalCounter.count = new BigInt(0) )
  let count = withdrawalCounter.count
  count = count.plus(ONE)
  withdrawalCounter.count = count
  withdrawalCounter.save()
  return count
}

// export function readCriterionCount () : string {
//   let criterionCounter = CriterionCounter.load('1')
//   return criterionCounter ? criterionCounter.count.toString() : '1'
// }

export function readDepositCount () : BigInt {
  let depositCounter = DepositCounter.load('1')
  return depositCounter ? depositCounter.count : new BigInt(1)
}

export function readTradeCount () : BigInt {
  let tradeCounter = TradeCounter.load('1')
  return tradeCounter ? tradeCounter.count : new BigInt(1)
}

export function readTransactionCount () : BigInt {
  let txCounter = TransactionCounter.load('1')
  return txCounter ? txCounter.count : new BigInt(1)
}

export function readUtilityTimestamp () : string {
  let utilityTimestamp = UtilityTimestamp.load('1')
  return utilityTimestamp ? utilityTimestamp.timestamp.toString() : '1'
}

export function readWithdrawalCount () : BigInt {
  let withdrawalCounter = WithdrawalCounter.load('1')
  return withdrawalCounter ? withdrawalCounter.count : new BigInt(1)
}

export function setUtilityTimestamp (timestamp: BigInt) : string {
  let utilityTimestamp = UtilityTimestamp.load('1')
  if (utilityTimestamp == null) utilityTimestamp = new UtilityTimestamp('1')
  utilityTimestamp.timestamp = timestamp
  utilityTimestamp.save()
  return timestamp.toString()
}