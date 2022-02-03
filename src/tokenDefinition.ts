import {
    Address,
    BigInt,
  } from "@graphprotocol/graph-ts"
  
  // Initialize a Token Definition with the attributes
  export class TokenDefinition {
    address : Address
    symbol: string
    name: string
    decimals: BigInt
  
    // Initialize a Token Definition with its attributes
    constructor(address: Address, symbol: string, name: string, decimals: BigInt) {
      this.address = address
      this.symbol = symbol
      this.name = name
      this.decimals = decimals
    }

    // Get all tokens with a static defintion
  static getStaticDefinitions(): Array<TokenDefinition> {
    let staticDefinitions = new Array<TokenDefinition>(6)

    // Add DGD
    let tokenDAI = new TokenDefinition(
      Address.fromString('0x6b175474e89094c44da98b954eedeac495271d0f'),
      'DAI',
      'DAI Stablecoin',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenDAI)

    let tokenUSDC = new TokenDefinition(
      Address.fromString('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'),
      'USDC',
      'USD Coin',
      BigInt.fromI32(6)
    )
    staticDefinitions.push(tokenUSDC)
    
    let tokenUSDT = new TokenDefinition(
      Address.fromString('0xdac17f958d2ee523a2206206994597c13d831ec7'),
      'USDT',
      'Tether USD',
      BigInt.fromI32(6)
    )
    staticDefinitions.push(tokenUSDT)

    let tokenSUSD = new TokenDefinition(
      Address.fromString('0x57ab1ec28d129707052df4df418d58a2d46d5f51'),
      'SUSD',
      'Synth sUSD',
      BigInt.fromI32(18)
    )
    staticDefinitions.push(tokenSUSD)

    return staticDefinitions
  }

  // Helper for hardcoded tokens
  static fromAddress(tokenAddress: Address) : TokenDefinition | null {
    let staticDefinitions = this.getStaticDefinitions()
    let tokenAddressHex = tokenAddress.toHexString()

    // Search the definition using the address
    for (let i = 0; i < staticDefinitions.length; i++) {
      let staticDefinition = staticDefinitions[i]
      if(staticDefinition.address.toHexString() == tokenAddressHex) {
        return staticDefinition
      }
    }

    // If not found, return null
    return null
  }
}