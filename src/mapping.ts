import {
  BigInt, 
  BigDecimal
} from "@graphprotocol/graph-ts"

import {
  shell,
  Approval,
  AssetIncluded,
  AssimilatorIncluded,
  FrozenSet,
  OwnershipTransfered,
  ParametersSet,
  PartitionRedeemed,
  PoolPartitioned,
  Trade,
  Transfer,
  FrozenSet__Params, 
  ProportionalDepositCall,
  SelectiveDepositCall__Inputs
} from "../generated/shell/shell"

import { 
   Pool,
   Token,
   User,
   ShellPosition,
   Transaction,
   Withdrawal,
   Deposit, 
   Swap,
   WeightTracker
} from "../generated/schema"

import {
  ADDRESS_ZERO,
  convertTokenToDecimal, 
  BI_18,
  createUser,
  decimalize, 
  getPool,
  getDecimalAmount, 
  getNumeraireAmount
} from "./helpers"

import { MintCall } from "../generated/shell/cERC20"

function isCompleteDeposit(depositID: string): boolean {
  let deposit = Deposit.load(depositID)
  if (deposit !== null) {
    return deposit.from !== null
  }
  else {  
    return false
  }
}

export function handleAssetIncluded(event: AssetIncluded): void { }

export function handleAssimilatorIncluded(event: AssimilatorIncluded): void {}  

export function handleFrozenSet(event: FrozenSet): void {}

export function handleOwnershipTransfered(event: OwnershipTransfered): void {}

export function handleParametersSet(event: ParametersSet): void {}

export function handlePartitionRedeemed(event: PartitionRedeemed): void {}

export function handlePoolPartitioned(event: PoolPartitioned): void {}

export function handleTrade(event: Trade): void {}

export function handleTransfer(event: Transfer): void {

  let from = event.params.from
  createUser(from)
  
  let to = event.params.to
  createUser(to)

  let value = convertTokenToDecimal(event.params.value, BI_18)

  let transactionHash = event.transaction.hash.toHexString()
  let transaction = Transaction.load(transactionHash)
  if (transaction === null) {
    transaction = new Transaction(transactionHash)
    transaction.blockNumber = event.block.number
    transaction.timeStamp = event.block.timestamp
    transaction.deposits = []
    transaction.withdrawals = []
    transaction.swaps = []
  }

  let fromUser = User.load(from.toHexString())
  if (fromUser !== null) {
    fromUser.txs = fromUser.txs.concat([transactionHash])
  }

  let toUser = User.load(from.toHexString())
  if (toUser !== null) {
    toUser.txs = toUser.txs.concat([transactionHash])
  }

  // Deposit
  let deposits = transaction.deposits
  if (from.toHexString() == ADDRESS_ZERO) {
     
    // Add what happens with the coins

    // Create a new deposit if there are no deposits so far or if the last one is done already
    if (deposits.length === 0 || isCompleteDeposit(deposits[deposits.length - 1])) {
      let deposit = new Deposit(
        event.transaction.hash
        .toHexString()
        .concat('-')
        .concat(BigInt.fromI32(deposits.length).toString()))
      deposit.transaction = transaction.id
      deposit.to = to
      deposit.from = from
      deposit.timeStamp = transaction.timeStamp
      deposit.save()

      transaction.deposits = deposits.concat([deposit.id])
      transaction.save()
    }
  }
 
  let withdrawals = transaction.withdrawals
  if (to.toHexString() == ADDRESS_ZERO) 
  {
    
    // Add what happens with coins

    // Create a new withdrawal if there are no withdrawals so far
    let withdrawal = new Withdrawal(
      event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(withdrawals.length).toString())
      )
      withdrawal.transaction = transaction.id
      withdrawal.to = to
      withdrawal.from = from
      withdrawal.timeStamp = transaction.timeStamp
      withdrawal.liquidity = value
      withdrawal.save()

      withdrawals.push(withdrawal.id)
      transaction.withdrawals = withdrawals
      transaction.save()

  }

}

export function handleProportionalDepositCall (call: ProportionalDepositCall) : void {
  
  let pool = getPool()

  let transactionHash = call.transaction.hash.toHexString()
  let transaction = Transaction.load(transactionHash)
  if (transaction === null) {
    transaction = new Transaction(transactionHash)
  }
  let depositsList = transaction.deposits
  
  let deposit = Deposit.load(
    call.transaction.hash
    .toHexString()
    .concat('-')
    .concat(BigInt.fromI32(depositsList.length).toString()))
  if (deposit === null) {
    deposit = new Deposit(
      call.transaction.hash
      .toHexString()
      .concat('-')
      .concat(BigInt.fromI32(depositsList.length).toString()))
  }

  let deposits = call.outputs.deposits_
  let shellsMinted = decimalize(call.outputs.shellsMinted_, 18)
  
  let depositAmounts = new Array<BigDecimal>(deposits.length)
  let depositAmountsNumeraire = new Array<BigDecimal>(deposits.length)
  let depositTokens = pool.numeraires as Array<string>

  for (let i = 0; i < deposits.length; i++) {
    let token = depositTokens[i]
    depositAmounts[i] = getDecimalAmount(token, deposits[i])
    depositAmountsNumeraire[i] = getNumeraireAmount(token, deposits[i])
  }

  deposit.amounts = depositAmounts
  deposit.amountsNumeraire = depositAmountsNumeraire
  deposit.tokens = depositTokens
  deposit.lpShares = shellsMinted


}

