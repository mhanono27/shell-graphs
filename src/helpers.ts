import { ethereum, Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts"

import { ERC20 } from "../generated/Shell/ERC20"
import { cERC20 } from "../generated/Shell/cERC20"
import { Shell } from "../generated/Shell/Shell"

import {
    // Criterion,
    Token,
    Transaction,
    Pool,
    UtilityFrame,
    Parameters,
} from "../generated/schema"

import {
    // countCriterion, readCriterionCount,
    countDeposit, readDepositCount,
    countWithdrawal, readWithdrawalCount,
    countUtility, readUtilityTimestamp, setUtilityTimestamp,
    countTransaction, readTransactionCount,
    countTrade, readTradeCount
} from "./utilities"

import { SHELL, ONE } from "./constants"

export function getPool () : Pool {
    let pool = Pool.load(SHELL)
    if (pool == null) pool = new Pool(SHELL) 
    return pool
}

// export function saveTransaction (_tx: ethereum.Transaction) : void {
//     let hash = _tx.hash.toHexString()
//     let tx = new Transaction(hash)
//     tx.hash = hash
//     tx.count = countTransaction()
//     tx.index = _tx.index
//     tx.from = _tx.from.toHexString()
//     if(_tx.to != null){
//         tx.to = _tx.to.toHexString()
//     }
//     tx.gas_used = _tx.gasUsed
//     tx.gas_price = _tx.gasPrice
//     tx.save()
// }

// export function saveParameters (timestamp: BigInt) : void {
//     let parameters = Parameters.load(timestamp.toString())
//     if (parameters == null) {
//         let criterion = Criterion.load(readCriterionCount())
//         parameters = new Parameters(timestamp.toString())
//         parameters.criterion = criterion.id
//         parameters.alpha = criterion.alpha
//         parameters.beta = criterion.beta
//         parameters.delta = criterion.delta
//         parameters.epsilon = criterion.epsilon
//         parameters.lambda = criterion.lambda
//         parameters.weights = criterion.weights
//     }
//     parameters.save()
// }

export function decimalize ( int_amount: BigInt, decimals: i32) : BigDecimal {
    let scaled_decimal = BigInt.fromI32(10).pow( u8(decimals) ).toBigDecimal()
    let val = int_amount.toBigDecimal()
    return val.div(scaled_decimal)
}

export function getDecimalAmount( address: string , int_amount : BigInt ) : BigDecimal {
    let token = Token.load(address);
    if(token == null) token = new Token('');
    let decimals = token.decimals
    // let decimals = token.decimals
    return decimalize(int_amount, decimals)
} 
  
export function getNumeraireAmount( address: string , int_amount : BigInt ) : BigDecimal {
    let token = Token.load(address);
    if(token == null) token = new Token('');
    let decimals = token.decimals
    // let decimals = token.decimals.toI32()
    return decimalize(int_amount, decimals)
} 

export function getNumeraireBalance (reserveAddr: string) : BigDecimal {

    let token = Token.load(reserveAddr)
    if(token == null) token = new Token('');
    
    // TODO: Compound numeraire calculation requires knowledge of numeraire's decimals
    if (token.name.includes('Compound')) {

        let cerc20 = cERC20.bind(Address.fromHexString(token.id) as Address)
        let xr = cerc20.try_exchangeRateStored()
        let balance = cerc20.try_balanceOf(Address.fromHexString(SHELL) as Address)
        let numeraire_bigint = balance.value.times(xr.value)
        let numeraire_decimal = decimalize(numeraire_bigint, 18 + token.decimals)
        return numeraire_decimal

    } else {

        let erc20 = ERC20.bind(Address.fromHexString(token.id) as Address)
        let balance = erc20.try_balanceOf(Address.fromHexString(SHELL) as Address)
        let balance_decimal = decimalize(balance.value, token.decimals)
        return balance_decimal

    } 
    
    return new BigDecimal(new BigInt(0)) // satisfy function signature

}

export function getShellSupply () : BigDecimal {
    let shell = Shell.bind(Address.fromHexString(SHELL) as Address)
    let totalSupply = shell.try_totalSupply()
    let totalSupplyDecimal = decimalize(totalSupply.value, 18)
    return totalSupplyDecimal
}

export function saveUtilityFrame (block: ethereum.Block) : void {
    
    let priorUtilFrame = UtilityFrame.load(readUtilityTimestamp())
    if(priorUtilFrame == null) priorUtilFrame = new UtilityFrame('');
    
    if (priorUtilFrame.block != block.number) {

        let nextUtilFrame = new UtilityFrame(setUtilityTimestamp(block.timestamp))
        
        let pool = getPool()
        
        if (priorUtilFrame != null) {
            
            nextUtilFrame.preceding_lp_shares = priorUtilFrame.proceeding_lp_shares
            nextUtilFrame.preceding_liquidity = priorUtilFrame.proceeding_liquidity
            nextUtilFrame.preceding_parameters = priorUtilFrame.proceeding_parameters
            nextUtilFrame.first = false

        } else nextUtilFrame.first = true
            
        let reserves = pool.reserves as Array<String>
        let proceedingLiquidity = new Array<BigDecimal>(reserves.length)
        
        for (let i = 0; i < reserves.length; i++) {
            proceedingLiquidity[i] = getNumeraireBalance(reserves[i] as string)
        }
        
        nextUtilFrame.proceeding_liquidity = proceedingLiquidity
        nextUtilFrame.proceeding_lp_shares = getShellSupply()
        nextUtilFrame.proceeding_parameters = block.timestamp.toString()
    
        nextUtilFrame.count = countUtility()
        nextUtilFrame.pool = pool.id
        nextUtilFrame.block = block.number
        
        nextUtilFrame.save()
            
        
    }
    
    
}