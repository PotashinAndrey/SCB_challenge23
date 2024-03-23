export default class ObjectPath {
  readonly path: Array<string>;

  constructor(...path: Array<string | number | undefined>) {
    this.path = ObjectPath.items(...path);
  }

  get length(): number {
    return this.path.length;
  }

  equal(path: ObjectPath): boolean {
    return ObjectPath.equal(this, path);
  }

  at(index: number): string | undefined {
    const item = index < 0 ? this.length - 1 - index : index;
    return this.path[item];
  }

  removeLast(n = 1): ObjectPath {
    if (n <= 0) return this;
    return new ObjectPath(...this.path.slice(0, -n));
  }

  removeFirst(n = 1): ObjectPath {
    if (n <= 0) return this;
    return new ObjectPath(...this.path.slice(n));
  }

  remove(startIndex: number, count = 1): ObjectPath {
    const path = this.path.slice(); // copy
    path.splice(startIndex, count);
    return new ObjectPath(...path);
  }

  insert(startIndex: number, ...list: Array<string | number>): ObjectPath {
    const path = this.path.slice(); // copy
    const items = list.map((e) => e.toString().split('.')).flat(1);
    path.splice(startIndex, 0, ...items);
    return new ObjectPath(...path);
  }

  append(...tail: Array<string | number>): ObjectPath {
    const items = ObjectPath.items(...tail);
    return new ObjectPath(...this.path, ...items);
  }

  prepend(...head: Array<string | number>): ObjectPath {
    const items = ObjectPath.items(...head);
    return new ObjectPath(...items, ...this.path);
  }

  has(list: Array<string | number>): boolean {
    const items = ObjectPath.items(...list).join('.');
    return this.toString().includes(items);
  }

  startsWith(...head: Array<string | number>): boolean {
    const items = ObjectPath.items(...head);
    return items.every((e, index) => this.path[index] === e);
  }

  endsWith(...tail: Array<string | number>): boolean {
    const items = ObjectPath.items(...tail).reverse();
    return items.every((e, index) => this.at(-(index + 1)) === e);
  }

  slice(startIndex: number, endIndex?: number): ObjectPath {
    return new ObjectPath(...this.path.slice(startIndex, endIndex));
  }

  indexOf(item: string | number) {
    return this.path.indexOf(item.toString());
  }

  lastIndexOf(item: string | number) {
    return this.path.lastIndexOf(item.toString());
  }

  toString(): string {
    return this.path.join('.');
  }

  getObjectValue<R = undefined, T = any>(obj: T, defaultValue?: R): R {
    const { length } = this.path;

    let result = obj as any;
    for (let i = 0; i < length; i++) {
      result = result?.[this.path[i]];
      if (result === undefined) break;
    }

    return (result === undefined ? defaultValue : result) as R;
  }

  /** @mutable */
  setObjectValue<R = any, T = any>(obj: T, value: R): void {
    const instance = obj instanceof Object;
    if (!instance) throw new Error('Argument is not Object');

    const { length } = this.path;
    let current = obj; // result;

    for (let i = 0; i < length; i++) {
      const field = ObjectPath.key(this.path[i]);
      if (i === length - 1) {
        if (Array.isArray(current) && typeof field !== 'number') {
          throw new Error(`Trying to write string key to array: ${this.toString()}`);
        }
        current[field] = value;
        return;
      }

      const next = this.path[i + 1];
      if (next !== undefined) {
        const root = current[field] instanceof Object;
        if (!root) {
          const key = ObjectPath.key(next);
          current[field] = typeof key === 'number' ? [] : {};
        }
      }

      current = current[field];
    }
  }

  hasObjectValue<T = any>(obj: T): boolean {
    return this.getObjectValue<any, T>(obj) !== undefined;
  }

  removeObjectValue<T = any>(obj: T): void {
    if (!this.hasObjectValue(obj)) return;
    this.setObjectValue(obj, undefined);
  }

  transferObjectValue({ from, to }): void {
    return this.setObjectValue(to, this.getObjectValue(from));
  }

  /** Список индексов в элментах массивов в пути
   * @example foo.0.bar.1.baz.2.value -> [0, 1, 2]
   */
  get indices(): Array<number> {
    return this.path
      .filter((e) => {
        const numeric = Number.parseInt(e, 10);
        return !Number.isNaN(numeric) && numeric.toString().length === e.length;
      })
      .map((e) => Number.parseInt(e, 10));
  }

  static key(propertyName: string): string | number {
    const numeric = Number.parseInt(propertyName, 10);
    const isArray = !Number.isNaN(numeric);
    return isArray ? numeric : propertyName;
  }

  /** Возвращает все пути */
  static all<T>(obj: T, prefix?: Array<string>): Array<ObjectPath> {
    const keys = Object.keys(obj as any);

    const childs = keys.filter((key) => obj[key] instanceof Object).map((key: string): Array<ObjectPath> => ObjectPath.all(obj[key], [key]));

    const list = keys.map((key) => new ObjectPath(key)).concat(...childs);

    if (!prefix) return list;
    return list.map((path) => path.prepend(...prefix));
  }

  /** Возвращает все конечные пути (до листьев) */
  static leafs<T>(obj: T): Array<ObjectPath> {
    const paths = ObjectPath.all<T>(obj).map((p) => p.toString());
    return paths.filter((path, _index, list) => !list.find((p) => p.startsWith(path + '.'))).map((p) => new ObjectPath(p));
  }

  static items(...list: Array<string | number | undefined>): Array<string> {
    return list
      .filter((e) => e !== undefined)
      .map((e) => e!.toString().split('.'))
      .flat(1);
  }

  static equal(a: ObjectPath, b: ObjectPath): boolean {
    return a.toString() === b.toString();
  }
}
