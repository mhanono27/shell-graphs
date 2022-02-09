import { 
  BigInt,
  log
} from "@graphprotocol/graph-ts"
import { LiquidityPosition, User} from "../generated/schema"
import {
  Shell,
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
  ProportionalDepositCall,
  ProportionalWithdrawCall,
  SelectiveDepositCall,
  SelectiveWithdrawCall
} from "../generated/Shell/Shell"
import {
  createUser,
  createLiquidityPosition,
  zeroAddress, 
  decimalize, 
  convertTokenToDecimal,  
  BI_18
} from "../src/helpers"

export function handleAssetIncluded(event: AssetIncluded): void {}

export function handleAssimilatorIncluded(event: AssimilatorIncluded): void {}

export function handleFrozenSet(event: FrozenSet): void {}

export function handleOwnershipTransfered(event: OwnershipTransfered): void {}

export function handleParametersSet(event: ParametersSet): void {}

export function handlePartitionRedeemed(event: PartitionRedeemed): void {}

export function handlePoolPartitioned(event: PoolPartitioned): void {}

export function handleTrade(event: Trade): void {}

export function handleTransfer(event: Transfer): void {

  let from = event.params.from
  let fromUser = createUser(from)
  let to = event.params.to
  let toUser = createUser(to)

  //log.warning("fromUser ID: {}", [fromUser.id])
  //log.warning("toUser ID: {}", [toUser.id])

  if (from.toHexString() != zeroAddress) {
    let fromUserLiquidtyPosition = createLiquidityPosition(event.address, from)
    fromUserLiquidtyPosition.timestamp = event.block.timestamp.toI32()
    fromUserLiquidtyPosition.block = event.block.number.toI32()

    let positions = fromUser.liquidityPositions
    //log.warning("Liquidity Position FROM ID {}", [fromUserLiquidtyPosition.id])
    // I think the error could be in how I'm calculating the counter?
    let count = positions.push(fromUserLiquidtyPosition.id)
    fromUser.counter = BigInt.fromI32(count)
    log.warning('Liquidity Positions {}' , positions)
    log.warning('Liquidity Positions Counter {}', [fromUser.counter.toString()])
    
    
    if (fromUser.counter === BigInt.fromI32(1)) {
      fromUserLiquidtyPosition.liquidityTokenBalance = convertTokenToDecimal(event.params.value, BI_18)
    }
    else {
      let prevPositionID = positions[positions.length-1]
      let prevPosition = LiquidityPosition.load(prevPositionID)
      if (prevPosition !== null) {
        fromUserLiquidtyPosition.liquidityTokenBalance = prevPosition.liquidityTokenBalance.plus(convertTokenToDecimal(event.params.value, BI_18))
      }
    }

    fromUserLiquidtyPosition.save()
    fromUser.save()
  }

  if (to.toHexString() != zeroAddress) {
    
  }
    let toUserLiquidityPosition = createLiquidityPosition(event.address, to)
    let positions = toUser.liquidityPositions
    //log.warning("Liquidity Position TO ID", [toUserLiquidityPosition.id])

    toUserLiquidityPosition.timestamp = event.block.timestamp.toI32()
    toUserLiquidityPosition.block = event.block.number.toI32()
    positions.push(toUserLiquidityPosition.id)
    toUser.counter = BigInt.fromI32(toUser.liquidityPositions.length)

    let prevPositionID = positions[positions.length-1]
    let prevPosition = LiquidityPosition.load(prevPositionID)
    if (prevPosition !== null) {
      toUserLiquidityPosition.liquidityTokenBalance = prevPosition.liquidityTokenBalance.minus(convertTokenToDecimal(event.params.value, BI_18))
    }

    toUserLiquidityPosition.save()
    toUser.save()

    

}