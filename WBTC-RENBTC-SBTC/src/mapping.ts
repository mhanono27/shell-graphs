import { 
    BigDecimal,
    BigInt,
    ethereum,
    log
} from "@graphprotocol/graph-ts"

import {
    Approval as ApprovalEvent,
    AssetIncluded as AssetIncludedEvent,
    AssimilatorIncluded as AssimilatorIncludedEvent,
    FrozenSet as FrozenSetEvent,
    OriginSwapCall,
    OwnershipTransfered as OwnershipTransferedEvent,
    ParametersSet as ParametersSetEvent,
    PartitionRedeemed as PartitionRedeemedEvent,
    PartitionedWithdrawCall,
    PoolPartitioned as PoolPartitionedEvent,
    ProportionalDepositCall,
    ProportionalWithdrawCall,
    SelectiveDepositCall,
    SelectiveWithdrawCall,
    TargetSwapCall,
    Trade as TradeEvent,
    Transfer as TransferEvent
} from "../generated/Shell/Shell"

import {
    // Criterion,
    Token,
    Trade,
    Deposit,
    WeightTracker,
    Withdrawal,
} from "../generated/schema"

import {
    decimalize,
    getDecimalAmount,
    getNumeraireAmount,
    getPool,
    // saveParameters,
    // saveTransaction,
    saveUtilityFrame,
} from "./helpers"

import {
    // countCriterion, readCriterionCount,
    countDeposit, readDepositCount,
    countWithdrawal, readWithdrawalCount,
    countUtility, readUtilityTimestamp,
    countTransaction, readTransactionCount,
    countTrade, readTradeCount
} from "./utilities"

import { ERC20 } from "../generated/Shell/ERC20"

import { SHELL, ONE, ZERO_ADDR } from "./constants"

export function handleAssetIncludedEvent (event: AssetIncludedEvent) : void {
    
    log.warning("handle asset included", [])
    
    let pool = getPool()

    log.warning("after pool", [])
    
    let n = new Token(event.params.numeraire.toHexString())
    let r = new Token(event.params.reserve.toHexString())
    
    log.warning("after n and r", [])
    
    let n_erc20 = ERC20.bind(event.params.numeraire)
    let r_erc20 = ERC20.bind(event.params.reserve)

    log.warning("after n and r binding", [])
    
    let n_symbol = n_erc20.try_symbol()
    let n_name = n_erc20.try_name()
    let n_decimals = n_erc20.try_decimals()
    
    log.warning("after n try", [])

    let r_symbol = r_erc20.try_symbol()
    let r_name = r_erc20.try_name()
    let r_decimals = r_erc20.try_decimals()
    
    log.warning("after r try", [])

    if (!n_symbol.reverted) n.symbol = n_symbol.value 
    if (!n_name.reverted) n.name = n_name.value
    if (!n_decimals.reverted) n.decimals = n_decimals.value
        
    log.warning("after n setting", [])

    if (!r_symbol.reverted) r.symbol = r_symbol.value
    if (!r_name.reverted) r.name = r_name.value
    if (!r_decimals.reverted) r.decimals = r_decimals.value

    log.warning("after r setting", [])
        
    n.save()
    r.save()
    
    log.warning("after n & r saving", [])

    let ns = pool.numeraires ? pool.numeraires : new Array<string>(0)
    let rs = pool.reserves ? pool.reserves : new Array<string>(0)
    
    log.warning("afer getting ns and rs", [])
    
    // ns[ns.length] = n.id
    // rs[rs.length] = r.id
    
    ns.push(n.id)
    rs.push(r.id)
    
    log.warning("after pushing ns and rs", [])
    
    pool.numeraires = ns
    pool.reserves = rs
    
    log.warning("after setting ns and rs", [])
    
    pool.save()
    
    log.warning("after pool saving", [])
    
    let weight = decimalize(event.params.weight, 18)
    let weights = WeightTracker.load(SHELL)
    if (!weights) {
        weights = new WeightTracker(SHELL)
        weights.weights = new Array<BigDecimal>(0)
    }
    log.warning("after weight tracker loading", [])
    let the_weights = weights.weights ? weights.weights : new Array<BigDecimal>(0)
    log.warning("after getting the weights", [])
    the_weights.push(weight)
    log.warning("after pushing weight", [])
    weights.weights = the_weights
    log.warning("after setting weight", [])
    weights.save()
    log.warning("after saving weights", [])
    
}

export function handleOriginSwapCall (call: OriginSwapCall) : void { 
    
    let trade_count = countTrade()
    let pool = getPool()
    
    let trade = new Trade(
        pool.id
        .concat('-')
        .concat(trade_count.toString())
    )
    trade.count = trade_count
    
    trade.address = call.from

    trade.origin = call.inputs._origin.toHexString()
    let origin_amount = call.inputs._originAmount
    trade.origin_amount = getDecimalAmount(trade.origin, origin_amount)
    trade.origin_amount_numeraire = getNumeraireAmount(trade.origin, origin_amount)

    trade.target = call.inputs._target.toHexString()
    let target_amount = call.outputs.targetAmount_ 
    trade.target_amount = getDecimalAmount(trade.target, target_amount)
    trade.target_amount_numeraire = getNumeraireAmount(trade.target, target_amount)
    
    // saveWithMetadata('origin_swap', trade, call)

}
export function handleTargetSwapCall (call: TargetSwapCall) : void { 

    let trade_count = countTrade()
    let pool = getPool()
    
    let trade = new Trade(
        pool.id
        .concat('-')
        .concat(trade_count.toString())
    )
    trade.count = trade_count
    
    trade.address = call.from

    trade.origin = call.inputs._origin.toHexString()
    let origin_amount = call.outputs.originAmount_
    trade.origin_amount = getDecimalAmount(trade.origin, origin_amount)
    trade.origin_amount_numeraire = getNumeraireAmount(trade.origin, origin_amount)

    trade.target = call.inputs._target.toHexString()
    let target_amount = call.inputs._targetAmount 
    trade.target_amount = getDecimalAmount(trade.target, target_amount)
    trade.target_amount_numeraire = getNumeraireAmount(trade.target, target_amount)
    
    // saveWithMetadata('target_swap', trade, call)

}

// export function handleParametersSetEvent (event: ParametersSetEvent) : void { 

//     let alpha = decimalize(event.params.alpha, 18)
//     let beta = decimalize(event.params.beta, 18)
//     let delta = decimalize(event.params.delta, 18)
//     let epsilon = decimalize(event.params.epsilon, 18)
//     let lambda = decimalize(event.params.lambda, 18)
    
//     let count = countCriterion()
    
//     let criterion = new Criterion(count.toString())
//     criterion.count = count
//     criterion.alpha = alpha
//     criterion.beta = beta
//     criterion.delta = delta
//     criterion.epsilon = epsilon
//     criterion.lambda = lambda
//     criterion.timestamp = event.block.timestamp
//     criterion.weights = WeightTracker.load(SHELL).weights
    
//     criterion.save()

// }


export function handleProportionalDepositCall (call: ProportionalDepositCall) : void {
    
    
    let pool = getPool()
    let count = countDeposit()
    let deposit = new Deposit(
        pool.id
        .concat('-')
        .concat(count.toString()))
    deposit.count = count
    
    let deposits = call.outputs.deposits_
    let shells_minted = decimalize(call.outputs.shellsMinted_, 18)
    
    let deposit_amounts = new Array<BigDecimal>(deposits.length)
    let deposit_amounts_numeraire = new Array<BigDecimal>(deposits.length)
    let deposit_tokens = pool.numeraires as Array<string>
    
    for (let i = 0; i < deposits.length; i++) { 
        let token = deposit_tokens[i]
        deposit_amounts[i] = getDecimalAmount(token, deposits[i])
        deposit_amounts_numeraire[i] = getNumeraireAmount(token, deposits[i])
    } 
    
    deposit.amounts = deposit_amounts
    deposit.amounts_numeraire = deposit_amounts_numeraire
    deposit.tokens = deposit_tokens
    deposit.lp_shares = shells_minted
    
    // saveWithMetadata("proportional_deposit", deposit, call)
    
}

export function handleProportionalWithdrawCall (call: ProportionalWithdrawCall) : void {
    
    let pool = getPool()
    let count = countWithdrawal()
    let withdrawal = new Withdrawal(
        SHELL
        .concat('-')
        .concat(count.toString()))
    withdrawal.count = count
    
    let outputs = call.outputs.withdrawals_

    let shells_burnt = decimalize(call.inputs._shellsToBurn, 18).neg()

    let output_amounts = new Array<BigDecimal>(outputs.length)
    let output_amounts_numeraire = new Array<BigDecimal>(outputs.length)
    let output_tokens_string = pool.numeraires as Array<string>

    for (let i = 0; i < outputs.length; i++) {
        let token = output_tokens_string[i]
        output_amounts[i] = getDecimalAmount(token, outputs[i])
        output_amounts_numeraire[i] = getNumeraireAmount(token, outputs[i])
    }
    
    withdrawal.amounts = output_amounts
    withdrawal.amounts_numeraire = output_amounts_numeraire
    withdrawal.tokens = output_tokens_string
    withdrawal.lp_shares = shells_burnt
    
    // saveWithMetadata("proportional_withdrawal", withdrawal, call)
    
}

// export function saveWithMetadata<T>(type: string, entity: T, call: ethereum.Call) : void {
    
//     entity.type = type
//     entity.transaction = call.transaction.hash.toHexString()
//     entity.parameters = call.block.timestamp.toString()
//     entity.utility_frame = call.block.timestamp.toString()
//     entity.timestamp = call.block.timestamp
//     entity.pool = SHELL
//     entity.save()
    
//     // saveParameters(call.block.timestamp)
//     saveTransaction(call.transaction)
//     saveUtilityFrame(call.block)

// }

export function handleSelectiveDepositCall (call: SelectiveDepositCall) : void {
    
    let count = countDeposit()
    let deposit = new Deposit(
        SHELL
        .concat('-')
        .concat(count.toString()))
    deposit.count = count
    
    let shellsMinted = decimalize(call.outputs.shellsMinted_, 18)

    let inputAmounts = call.inputs._amounts
    
    let inputTokenAddresses = call.inputs._derivatives

    let input_amounts_decimal = new Array<BigDecimal>(inputAmounts.length)
    let input_amounts_numeraire = new Array<BigDecimal>(inputAmounts.length)
    let input_tokens_string = new Array<string>(inputTokenAddresses.length)

    for (let i = 0; i < inputTokenAddresses.length; i++) {
        let token = inputTokenAddresses[i].toHexString()
        input_tokens_string[i] = token
        input_amounts_decimal[i] = getDecimalAmount(token, inputAmounts[i])
        input_amounts_numeraire[i] = getNumeraireAmount(token, inputAmounts[i])
    }
    
    deposit.amounts = input_amounts_decimal
    deposit.amounts_numeraire = input_amounts_numeraire
    deposit.tokens = input_tokens_string
    deposit.lp_shares = shellsMinted
    
    // saveWithMetadata("selective_deposit", deposit, call)
    
}

export function handleSelectiveWithdrawCall (call: SelectiveWithdrawCall) : void { 
    
    let count = countWithdrawal()
    let withdrawal = new Withdrawal(
        SHELL
        .concat('-')
        .concat(count.toString()))
    withdrawal.count = count
    
    let shellsBurned = decimalize(call.outputs.shellsBurned_, 18)

    let inputAmounts = call.inputs._amounts
    let inputTokenAddresses = call.inputs._derivatives
    
    let input_amounts_decimal = new Array<BigDecimal>(inputAmounts.length)
    let input_amounts_numeraire = new Array<BigDecimal>(inputAmounts.length)
    let input_tokens_string = new Array<string>(inputTokenAddresses.length)
    
    for (let i = 0; i < inputTokenAddresses.length; i++) {
        let token = inputTokenAddresses[i].toHexString()
        input_tokens_string[i] = token
        input_amounts_decimal[i] = getDecimalAmount(token, inputAmounts[i])
        input_amounts_numeraire[i] = getNumeraireAmount(token, inputAmounts[i])
    }
    
    withdrawal.amounts = input_amounts_decimal
    withdrawal.amounts_numeraire = input_amounts_numeraire
    withdrawal.tokens = input_tokens_string
    withdrawal.lp_shares = shellsBurned
    
    // saveWithMetadata("selective_withdrawal", withdrawal, call)
    
}
    
export function handleOwnershipTransferedEvent (event: OwnershipTransferedEvent) : void { }
export function handlePartitionedWithdrawCall (event: PartitionedWithdrawCall) : void { }
export function handlePartitionRedeemedEvent (event: PartitionRedeemedEvent) : void { }
export function handlePoolPartitionedEvent (event: PoolPartitionedEvent) : void { }
export function handleTradeEvent (event: TradeEvent) : void { }
export function handleApprovalEvent (event: ApprovalEvent) : void { }
export function handleFrozenSetEvent (event: FrozenSetEvent) : void { }
