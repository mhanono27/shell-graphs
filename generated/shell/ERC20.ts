// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get src(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get dst(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amt(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get src(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get dst(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amt(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ERC20 extends ethereum.SmartContract {
  static bind(address: Address): ERC20 {
    return new ERC20("ERC20", address);
  }

  allowance(src: Address, dst: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(src), ethereum.Value.fromAddress(dst)]
    );

    return result[0].toBigInt();
  }

  try_allowance(src: Address, dst: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(src), ethereum.Value.fromAddress(dst)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  approve(dst: Address, amt: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(amt)
    ]);

    return result[0].toBoolean();
  }

  try_approve(dst: Address, amt: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(amt)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  balanceOf(whom: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(whom)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(whom: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(whom)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  decreaseApproval(dst: Address, amt: BigInt): boolean {
    let result = super.call(
      "decreaseApproval",
      "decreaseApproval(address,uint256):(bool)",
      [ethereum.Value.fromAddress(dst), ethereum.Value.fromUnsignedBigInt(amt)]
    );

    return result[0].toBoolean();
  }

  try_decreaseApproval(
    dst: Address,
    amt: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "decreaseApproval",
      "decreaseApproval(address,uint256):(bool)",
      [ethereum.Value.fromAddress(dst), ethereum.Value.fromUnsignedBigInt(amt)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getColor(): Bytes {
    let result = super.call("getColor", "getColor():(bytes32)", []);

    return result[0].toBytes();
  }

  try_getColor(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("getColor", "getColor():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  increaseApproval(dst: Address, amt: BigInt): boolean {
    let result = super.call(
      "increaseApproval",
      "increaseApproval(address,uint256):(bool)",
      [ethereum.Value.fromAddress(dst), ethereum.Value.fromUnsignedBigInt(amt)]
    );

    return result[0].toBoolean();
  }

  try_increaseApproval(
    dst: Address,
    amt: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "increaseApproval",
      "increaseApproval(address,uint256):(bool)",
      [ethereum.Value.fromAddress(dst), ethereum.Value.fromUnsignedBigInt(amt)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transfer(dst: Address, amt: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(amt)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(dst: Address, amt: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(amt)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  transferFrom(src: Address, dst: Address, amt: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(src),
        ethereum.Value.fromAddress(dst),
        ethereum.Value.fromUnsignedBigInt(amt)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    src: Address,
    dst: Address,
    amt: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(src),
        ethereum.Value.fromAddress(dst),
        ethereum.Value.fromUnsignedBigInt(amt)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  exchangeRateStored(): BigInt {
    let result = super.call(
      "exchangeRateStored",
      "exchangeRateStored():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_exchangeRateStored(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "exchangeRateStored",
      "exchangeRateStored():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get dst(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DecreaseApprovalCall extends ethereum.Call {
  get inputs(): DecreaseApprovalCall__Inputs {
    return new DecreaseApprovalCall__Inputs(this);
  }

  get outputs(): DecreaseApprovalCall__Outputs {
    return new DecreaseApprovalCall__Outputs(this);
  }
}

export class DecreaseApprovalCall__Inputs {
  _call: DecreaseApprovalCall;

  constructor(call: DecreaseApprovalCall) {
    this._call = call;
  }

  get dst(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DecreaseApprovalCall__Outputs {
  _call: DecreaseApprovalCall;

  constructor(call: DecreaseApprovalCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class IncreaseApprovalCall extends ethereum.Call {
  get inputs(): IncreaseApprovalCall__Inputs {
    return new IncreaseApprovalCall__Inputs(this);
  }

  get outputs(): IncreaseApprovalCall__Outputs {
    return new IncreaseApprovalCall__Outputs(this);
  }
}

export class IncreaseApprovalCall__Inputs {
  _call: IncreaseApprovalCall;

  constructor(call: IncreaseApprovalCall) {
    this._call = call;
  }

  get dst(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class IncreaseApprovalCall__Outputs {
  _call: IncreaseApprovalCall;

  constructor(call: IncreaseApprovalCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get dst(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amt(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get src(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get dst(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get amt(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ExchangeRateStoredCall extends ethereum.Call {
  get inputs(): ExchangeRateStoredCall__Inputs {
    return new ExchangeRateStoredCall__Inputs(this);
  }

  get outputs(): ExchangeRateStoredCall__Outputs {
    return new ExchangeRateStoredCall__Outputs(this);
  }
}

export class ExchangeRateStoredCall__Inputs {
  _call: ExchangeRateStoredCall;

  constructor(call: ExchangeRateStoredCall) {
    this._call = call;
  }
}

export class ExchangeRateStoredCall__Outputs {
  _call: ExchangeRateStoredCall;

  constructor(call: ExchangeRateStoredCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}
