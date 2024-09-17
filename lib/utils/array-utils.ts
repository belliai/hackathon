export class ObjectSet<T extends Record<string, any>> {
  private items: Map<string, T> = new Map()

  constructor(private uniqueProperty: keyof T) {}

  add(item: T): void {
    const key = this.getKey(item)
    this.items.set(key, item)
  }

  addAll(items: T[]): void {
    items.forEach((item) => this.add(item))
  }

  getItems(): T[] {
    return Array.from(this.items.values())
  }

  private getKey(item: T): string {
    return item[this.uniqueProperty].toString()
  }
}
