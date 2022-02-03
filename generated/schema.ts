// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("reserves", Value.fromStringArray(new Array(0)));
    this.set("numeraires", Value.fromStringArray(new Array(0)));
    this.set("totalVolumeUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalVolumeETH", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalLiquidityUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalLiquidityETH", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("totalSwapVolume", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txCount", Value.fromBigInt(BigInt.zero()));
    this.set("shellCount", Value.fromBigInt(BigInt.zero()));
    this.set("totalSwapFee", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("alpha", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("beta", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("delta", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("epsilon", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("lambda", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get reserves(): Array<string> {
    let value = this.get("reserves");
    return value!.toStringArray();
  }

  set reserves(value: Array<string>) {
    this.set("reserves", Value.fromStringArray(value));
  }

  get numeraires(): Array<string> {
    let value = this.get("numeraires");
    return value!.toStringArray();
  }

  set numeraires(value: Array<string>) {
    this.set("numeraires", Value.fromStringArray(value));
  }

  get totalVolumeUSD(): BigDecimal {
    let value = this.get("totalVolumeUSD");
    return value!.toBigDecimal();
  }

  set totalVolumeUSD(value: BigDecimal) {
    this.set("totalVolumeUSD", Value.fromBigDecimal(value));
  }

  get totalVolumeETH(): BigDecimal {
    let value = this.get("totalVolumeETH");
    return value!.toBigDecimal();
  }

  set totalVolumeETH(value: BigDecimal) {
    this.set("totalVolumeETH", Value.fromBigDecimal(value));
  }

  get totalLiquidityUSD(): BigDecimal {
    let value = this.get("totalLiquidityUSD");
    return value!.toBigDecimal();
  }

  set totalLiquidityUSD(value: BigDecimal) {
    this.set("totalLiquidityUSD", Value.fromBigDecimal(value));
  }

  get totalLiquidityETH(): BigDecimal {
    let value = this.get("totalLiquidityETH");
    return value!.toBigDecimal();
  }

  set totalLiquidityETH(value: BigDecimal) {
    this.set("totalLiquidityETH", Value.fromBigDecimal(value));
  }

  get totalSwapVolume(): BigDecimal {
    let value = this.get("totalSwapVolume");
    return value!.toBigDecimal();
  }

  set totalSwapVolume(value: BigDecimal) {
    this.set("totalSwapVolume", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }

  get shellCount(): BigInt {
    let value = this.get("shellCount");
    return value!.toBigInt();
  }

  set shellCount(value: BigInt) {
    this.set("shellCount", Value.fromBigInt(value));
  }

  get totalSwapFee(): BigDecimal {
    let value = this.get("totalSwapFee");
    return value!.toBigDecimal();
  }

  set totalSwapFee(value: BigDecimal) {
    this.set("totalSwapFee", Value.fromBigDecimal(value));
  }

  get alpha(): BigDecimal {
    let value = this.get("alpha");
    return value!.toBigDecimal();
  }

  set alpha(value: BigDecimal) {
    this.set("alpha", Value.fromBigDecimal(value));
  }

  get beta(): BigDecimal {
    let value = this.get("beta");
    return value!.toBigDecimal();
  }

  set beta(value: BigDecimal) {
    this.set("beta", Value.fromBigDecimal(value));
  }

  get delta(): BigDecimal {
    let value = this.get("delta");
    return value!.toBigDecimal();
  }

  set delta(value: BigDecimal) {
    this.set("delta", Value.fromBigDecimal(value));
  }

  get epsilon(): BigDecimal {
    let value = this.get("epsilon");
    return value!.toBigDecimal();
  }

  set epsilon(value: BigDecimal) {
    this.set("epsilon", Value.fromBigDecimal(value));
  }

  get lambda(): BigDecimal {
    let value = this.get("lambda");
    return value!.toBigDecimal();
  }

  set lambda(value: BigDecimal) {
    this.set("lambda", Value.fromBigDecimal(value));
  }
}

export class WeightTracker extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("weights", Value.fromBigDecimalArray(new Array(0)));
    this.set("pool", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WeightTracker entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save WeightTracker entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("WeightTracker", id.toString(), this);
    }
  }

  static load(id: string): WeightTracker | null {
    return changetype<WeightTracker | null>(store.get("WeightTracker", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get weights(): Array<BigDecimal> {
    let value = this.get("weights");
    return value!.toBigDecimalArray();
  }

  set weights(value: Array<BigDecimal>) {
    this.set("weights", Value.fromBigDecimalArray(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("symbol", Value.fromString(""));
    this.set("name", Value.fromString(""));
    this.set("decimals", Value.fromBigInt(BigInt.zero()));
    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("tradeVolume", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("tradeVolumeUSD", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txCount", Value.fromBigInt(BigInt.zero()));
    this.set("totalLiquidity", Value.fromBigDecimal(BigDecimal.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get tradeVolume(): BigDecimal {
    let value = this.get("tradeVolume");
    return value!.toBigDecimal();
  }

  set tradeVolume(value: BigDecimal) {
    this.set("tradeVolume", Value.fromBigDecimal(value));
  }

  get tradeVolumeUSD(): BigDecimal {
    let value = this.get("tradeVolumeUSD");
    return value!.toBigDecimal();
  }

  set tradeVolumeUSD(value: BigDecimal) {
    this.set("tradeVolumeUSD", Value.fromBigDecimal(value));
  }

  get txCount(): BigInt {
    let value = this.get("txCount");
    return value!.toBigInt();
  }

  set txCount(value: BigInt) {
    this.set("txCount", Value.fromBigInt(value));
  }

  get totalLiquidity(): BigDecimal {
    let value = this.get("totalLiquidity");
    return value!.toBigDecimal();
  }

  set totalLiquidity(value: BigDecimal) {
    this.set("totalLiquidity", Value.fromBigDecimal(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("shellPositions", Value.fromString(""));
    this.set("usdSwapped", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("txs", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get shellPositions(): string {
    let value = this.get("shellPositions");
    return value!.toString();
  }

  set shellPositions(value: string) {
    this.set("shellPositions", Value.fromString(value));
  }

  get usdSwapped(): BigDecimal {
    let value = this.get("usdSwapped");
    return value!.toBigDecimal();
  }

  set usdSwapped(value: BigDecimal) {
    this.set("usdSwapped", Value.fromBigDecimal(value));
  }

  get txs(): Array<string> {
    let value = this.get("txs");
    return value!.toStringArray();
  }

  set txs(value: Array<string>) {
    this.set("txs", Value.fromStringArray(value));
  }
}

export class ShellPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("shellBalance", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("shell", Value.fromString(""));
    this.set("user", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ShellPosition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ShellPosition entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ShellPosition", id.toString(), this);
    }
  }

  static load(id: string): ShellPosition | null {
    return changetype<ShellPosition | null>(store.get("ShellPosition", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get shellBalance(): BigDecimal {
    let value = this.get("shellBalance");
    return value!.toBigDecimal();
  }

  set shellBalance(value: BigDecimal) {
    this.set("shellBalance", Value.fromBigDecimal(value));
  }

  get shell(): string {
    let value = this.get("shell");
    return value!.toString();
  }

  set shell(value: string) {
    this.set("shell", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }
}

export class Transaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("blockNumber", Value.fromBigInt(BigInt.zero()));
    this.set("timeStamp", Value.fromBigInt(BigInt.zero()));
    this.set("gasUsed", Value.fromBigInt(BigInt.zero()));
    this.set("gasPrice", Value.fromBigInt(BigInt.zero()));
    this.set("user", Value.fromString(""));
    this.set("swaps", Value.fromStringArray(new Array(0)));
    this.set("deposits", Value.fromStringArray(new Array(0)));
    this.set("withdrawals", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transaction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transaction entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transaction", id.toString(), this);
    }
  }

  static load(id: string): Transaction | null {
    return changetype<Transaction | null>(store.get("Transaction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value!.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get timeStamp(): BigInt {
    let value = this.get("timeStamp");
    return value!.toBigInt();
  }

  set timeStamp(value: BigInt) {
    this.set("timeStamp", Value.fromBigInt(value));
  }

  get gasUsed(): BigInt {
    let value = this.get("gasUsed");
    return value!.toBigInt();
  }

  set gasUsed(value: BigInt) {
    this.set("gasUsed", Value.fromBigInt(value));
  }

  get gasPrice(): BigInt {
    let value = this.get("gasPrice");
    return value!.toBigInt();
  }

  set gasPrice(value: BigInt) {
    this.set("gasPrice", Value.fromBigInt(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get swaps(): Array<string> {
    let value = this.get("swaps");
    return value!.toStringArray();
  }

  set swaps(value: Array<string>) {
    this.set("swaps", Value.fromStringArray(value));
  }

  get deposits(): Array<string> {
    let value = this.get("deposits");
    return value!.toStringArray();
  }

  set deposits(value: Array<string>) {
    this.set("deposits", Value.fromStringArray(value));
  }

  get withdrawals(): Array<string> {
    let value = this.get("withdrawals");
    return value!.toStringArray();
  }

  set withdrawals(value: Array<string>) {
    this.set("withdrawals", Value.fromStringArray(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timeStamp", Value.fromBigInt(BigInt.zero()));
    this.set("tokens", Value.fromStringArray(new Array(0)));
    this.set("tokenAmountsIn", Value.fromBigDecimalArray(new Array(0)));
    this.set("tokenAmountsOut", Value.fromBigDecimalArray(new Array(0)));
    this.set("transaction", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Swap entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timeStamp(): BigInt {
    let value = this.get("timeStamp");
    return value!.toBigInt();
  }

  set timeStamp(value: BigInt) {
    this.set("timeStamp", Value.fromBigInt(value));
  }

  get from(): Bytes | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromBytes(<Bytes>value));
    }
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }

  get tokenAmountsIn(): Array<BigDecimal> {
    let value = this.get("tokenAmountsIn");
    return value!.toBigDecimalArray();
  }

  set tokenAmountsIn(value: Array<BigDecimal>) {
    this.set("tokenAmountsIn", Value.fromBigDecimalArray(value));
  }

  get tokenAmountsOut(): Array<BigDecimal> {
    let value = this.get("tokenAmountsOut");
    return value!.toBigDecimalArray();
  }

  set tokenAmountsOut(value: Array<BigDecimal>) {
    this.set("tokenAmountsOut", Value.fromBigDecimalArray(value));
  }

  get tokenAmountNumeraires(): Array<BigDecimal> | null {
    let value = this.get("tokenAmountNumeraires");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimalArray();
    }
  }

  set tokenAmountNumeraires(value: Array<BigDecimal> | null) {
    if (!value) {
      this.unset("tokenAmountNumeraires");
    } else {
      this.set(
        "tokenAmountNumeraires",
        Value.fromBigDecimalArray(<Array<BigDecimal>>value)
      );
    }
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }
}

export class Deposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timeStamp", Value.fromBigInt(BigInt.zero()));
    this.set("amounts", Value.fromBigDecimalArray(new Array(0)));
    this.set("amountsNumeraire", Value.fromBigDecimalArray(new Array(0)));
    this.set("tokens", Value.fromStringArray(new Array(0)));
    this.set("transaction", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Deposit entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Deposit entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Deposit", id.toString(), this);
    }
  }

  static load(id: string): Deposit | null {
    return changetype<Deposit | null>(store.get("Deposit", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timeStamp(): BigInt {
    let value = this.get("timeStamp");
    return value!.toBigInt();
  }

  set timeStamp(value: BigInt) {
    this.set("timeStamp", Value.fromBigInt(value));
  }

  get from(): Bytes | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromBytes(<Bytes>value));
    }
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }

  get amounts(): Array<BigDecimal> {
    let value = this.get("amounts");
    return value!.toBigDecimalArray();
  }

  set amounts(value: Array<BigDecimal>) {
    this.set("amounts", Value.fromBigDecimalArray(value));
  }

  get amountsNumeraire(): Array<BigDecimal> {
    let value = this.get("amountsNumeraire");
    return value!.toBigDecimalArray();
  }

  set amountsNumeraire(value: Array<BigDecimal>) {
    this.set("amountsNumeraire", Value.fromBigDecimalArray(value));
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }

  get lpShares(): BigDecimal | null {
    let value = this.get("lpShares");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set lpShares(value: BigDecimal | null) {
    if (!value) {
      this.unset("lpShares");
    } else {
      this.set("lpShares", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get lpSharesTotal(): BigDecimal | null {
    let value = this.get("lpSharesTotal");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigDecimal();
    }
  }

  set lpSharesTotal(value: BigDecimal | null) {
    if (!value) {
      this.unset("lpSharesTotal");
    } else {
      this.set("lpSharesTotal", Value.fromBigDecimal(<BigDecimal>value));
    }
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }
}

export class Withdrawal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timeStamp", Value.fromBigInt(BigInt.zero()));
    this.set("liquidity", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("transaction", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Withdrawal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Withdrawal entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Withdrawal", id.toString(), this);
    }
  }

  static load(id: string): Withdrawal | null {
    return changetype<Withdrawal | null>(store.get("Withdrawal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timeStamp(): BigInt {
    let value = this.get("timeStamp");
    return value!.toBigInt();
  }

  set timeStamp(value: BigInt) {
    this.set("timeStamp", Value.fromBigInt(value));
  }

  get from(): Bytes | null {
    let value = this.get("from");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set from(value: Bytes | null) {
    if (!value) {
      this.unset("from");
    } else {
      this.set("from", Value.fromBytes(<Bytes>value));
    }
  }

  get to(): Bytes | null {
    let value = this.get("to");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set to(value: Bytes | null) {
    if (!value) {
      this.unset("to");
    } else {
      this.set("to", Value.fromBytes(<Bytes>value));
    }
  }

  get tokens(): Array<string> | null {
    let value = this.get("tokens");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set tokens(value: Array<string> | null) {
    if (!value) {
      this.unset("tokens");
    } else {
      this.set("tokens", Value.fromStringArray(<Array<string>>value));
    }
  }

  get liquidity(): BigDecimal {
    let value = this.get("liquidity");
    return value!.toBigDecimal();
  }

  set liquidity(value: BigDecimal) {
    this.set("liquidity", Value.fromBigDecimal(value));
  }

  get transaction(): string {
    let value = this.get("transaction");
    return value!.toString();
  }

  set transaction(value: string) {
    this.set("transaction", Value.fromString(value));
  }
}

export class Shell extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("alpha", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("beta", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("delta", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("epsilon", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("lambda", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("omega", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("frozen", Value.fromBoolean(false));
    this.set("liquidity", Value.fromBigDecimalArray(new Array(0)));
    this.set("totalShells", Value.fromBigDecimal(BigDecimal.zero()));
    this.set("shellPositions", Value.fromStringArray(new Array(0)));
    this.set("swaps", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Shell entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Shell entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Shell", id.toString(), this);
    }
  }

  static load(id: string): Shell | null {
    return changetype<Shell | null>(store.get("Shell", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get alpha(): BigDecimal {
    let value = this.get("alpha");
    return value!.toBigDecimal();
  }

  set alpha(value: BigDecimal) {
    this.set("alpha", Value.fromBigDecimal(value));
  }

  get beta(): BigDecimal {
    let value = this.get("beta");
    return value!.toBigDecimal();
  }

  set beta(value: BigDecimal) {
    this.set("beta", Value.fromBigDecimal(value));
  }

  get delta(): BigDecimal {
    let value = this.get("delta");
    return value!.toBigDecimal();
  }

  set delta(value: BigDecimal) {
    this.set("delta", Value.fromBigDecimal(value));
  }

  get epsilon(): BigDecimal {
    let value = this.get("epsilon");
    return value!.toBigDecimal();
  }

  set epsilon(value: BigDecimal) {
    this.set("epsilon", Value.fromBigDecimal(value));
  }

  get lambda(): BigDecimal {
    let value = this.get("lambda");
    return value!.toBigDecimal();
  }

  set lambda(value: BigDecimal) {
    this.set("lambda", Value.fromBigDecimal(value));
  }

  get omega(): BigDecimal {
    let value = this.get("omega");
    return value!.toBigDecimal();
  }

  set omega(value: BigDecimal) {
    this.set("omega", Value.fromBigDecimal(value));
  }

  get frozen(): boolean {
    let value = this.get("frozen");
    return value!.toBoolean();
  }

  set frozen(value: boolean) {
    this.set("frozen", Value.fromBoolean(value));
  }

  get liquidity(): Array<BigDecimal> {
    let value = this.get("liquidity");
    return value!.toBigDecimalArray();
  }

  set liquidity(value: Array<BigDecimal>) {
    this.set("liquidity", Value.fromBigDecimalArray(value));
  }

  get totalShells(): BigDecimal {
    let value = this.get("totalShells");
    return value!.toBigDecimal();
  }

  set totalShells(value: BigDecimal) {
    this.set("totalShells", Value.fromBigDecimal(value));
  }

  get shellPositions(): Array<string> {
    let value = this.get("shellPositions");
    return value!.toStringArray();
  }

  set shellPositions(value: Array<string>) {
    this.set("shellPositions", Value.fromStringArray(value));
  }

  get swaps(): Array<string> {
    let value = this.get("swaps");
    return value!.toStringArray();
  }

  set swaps(value: Array<string>) {
    this.set("swaps", Value.fromStringArray(value));
  }

  get withdrawals(): Array<string> | null {
    let value = this.get("withdrawals");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set withdrawals(value: Array<string> | null) {
    if (!value) {
      this.unset("withdrawals");
    } else {
      this.set("withdrawals", Value.fromStringArray(<Array<string>>value));
    }
  }

  get pool(): string | null {
    let value = this.get("pool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pool(value: string | null) {
    if (!value) {
      this.unset("pool");
    } else {
      this.set("pool", Value.fromString(<string>value));
    }
  }
}
