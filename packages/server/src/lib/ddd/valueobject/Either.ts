type Left<L> = { kind: 'left'; leftValue: L; };
type Right<R> = { kind: 'right'; rightValue: R;};

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(
    private readonly value: EitherValue<L, R>
  ) {}

  public map<T>(fn: (right: R) => T): Either<L, T> {
    return this.flatMap(r => Either.right(fn(r)));
  }

  public flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
    return this.fold(
      (leftValue) => Either.left(leftValue),
      (rightValue) => fn(rightValue)
    );
  }

  public mapLeft<T>(fn: (left: L) => T): Either<T, R> {
    return this.flatMapLeft(l => Either.left(fn(l)));
  }

  public flatMapLeft<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
    return this.fold(
      (leftValue) => fn(leftValue),
      (rightValue) => Either.right(rightValue)
    );
  }

  public isLeft(): boolean {
    return this.value.kind === 'left';
  }

  public isRight(): boolean {
    return this.value.kind === 'right';
  }

  public static isLeft<L>(either: Either<L, unknown>): either is Either<L, unknown> {
    return either.isLeft();
  }

  public static isRight<R>(either: Either<unknown, R>): either is Either<unknown, R> {
    return either.isRight();
  }

  public fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    switch (this.value.kind) {
      case 'left':
        return leftFn(this.value.leftValue);
      case 'right':
        return rightFn(this.value.rightValue);
    }
  }

  public async foldAsync<T>(leftFn: (left: L) => Promise<T> | T, rightFn: (right: R) => Promise<T> | T): Promise<T> {
    switch (this.value.kind) {
      case 'left':
        return await leftFn(this.value.leftValue);
      case 'right':
        return await rightFn(this.value.rightValue);
    }
  }

  public getOrThrow(error: Error): R {
    const throwFn = () => {
      throw error;
    }

    return this.fold(
      () => throwFn(),
      (rightValue) => rightValue
    );
  }

  public getLeft(): L {
    const throwFn = () => {
      throw new Error(`Either is right: ${JSON.stringify(this.value)}`);
    }

    return this.fold(
      (leftValue) => leftValue,
      () => throwFn()
    );
  }

  public getRight(): R {
    const throwFn = () => {
      throw new Error(`Either is left: ${JSON.stringify(this.value)}`);
    }

    return this.fold(
      () => throwFn(),
      (rightValue) => rightValue
    );
  }

  public get(error?: Error): R {
    const _error = error ?? new Error(`Either is left: ${JSON.stringify(this.value)}`);
    return this.getOrThrow(_error);
  }

  public getOrElse<K>(defaultValue: K): R | K {
    return this.fold<R | K>(
      () => defaultValue,
      (someValue: R) => someValue
    )
  }

  public ifPresent(func: (r: R) => void) {
    if (this.value.kind === "right") {
      func(this.value.rightValue);
    }
  }

  public async ifPresentAsync(func: (r: R) => Promise<void>) {
    if (this.value.kind === "right") {
      await func(this.value.rightValue);
    }
  }

  public static left<L, R>(value: L) {
    return new Either<L, R>({ kind: 'left', leftValue: value });
  }

  public static right<L, R>(value: R) {
    return new Either<L, R>({ kind: 'right', rightValue: value });
  }

  public static ofNullable<R>(value: R | null): Either<null, R> {
    if (value === null) {
      return new Either<null, R>({ kind: 'left', leftValue: null });
    }

    return new Either<null, R>({ kind: 'right', rightValue: value });
  }

  public static anyLeft(...values: Array<Either<unknown, unknown>>) {
    return values.some((value) => value.isLeft());
  }

  public static anyRight(...values: Array<Either<unknown, unknown>>) {
    return values.some((value) => value.isRight());
  }

  public static ifAnyLeft<L>(values: Array<Either<L, unknown>>, func: (l: L) => void) {
    for (let value of values) {
      if (Either.isLeft(value)) {
        func(value.getLeft());
        break;
      }
    }
  }

  public static ifAnyRight(values: Array<Either<unknown, unknown>>, func: (r: unknown) => void) {
    for (let value of values) {
      if (Either.isRight(value)) {
        func(value.getRight());
        break;
      }
    }
  }

  public static reduce<T>(values: Array<Either<unknown, unknown>>, func: (state: T | Partial<T>, value: Either<unknown, unknown>) => T | Partial<T>, initial?: T | Partial<T>): T | Partial<T> {
    let state: T | Partial<T> = !!initial ? initial : {};
    for (let value of values) {
      state = func(state, value);
    }

    return state;
  }
}
