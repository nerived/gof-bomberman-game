export class Queue<TItem> {
  private _size = 0
  private _capacity = 1
  private _list = Array(1)
  private _headIdx = 0
  private _tailIdx = 0

  get size() {
    return this._size
  }

  private _checkOnEmpty(): void {
    this.dequeue
    if (this._size === 0) {
      throw TypeError('Enque is empty')
    }
  }

  private _allocate(): void {
    const newList = Array(this.size * 2)
    for (let i = 0, p = this._headIdx; i < this.size; i++, p++) {
      newList[i] = this._list[p % this.size]
    }
    this._list = newList
    this._headIdx = 0
    this._tailIdx = this.size - 1
    this._capacity = newList.length
  }

  public enqueue(item: TItem): number {
    if (this.size === this._capacity) {
      this._allocate()
    }

    if (this.size > 0) {
      this._tailIdx = (this._tailIdx + 1) % this._capacity
    }

    this._list[this._tailIdx] = item
    this._size++

    return this._size
  }

  public dequeue(): TItem {
    this._checkOnEmpty()
    const item = this._list[this._headIdx]
    this._list[this._headIdx] = null

    if (this._headIdx !== this._tailIdx) {
      this._headIdx = (this._headIdx + 1) % this._capacity
    }

    this._size--
    return item
  }

  public head(): TItem {
    this._checkOnEmpty()
    return this._list[this._headIdx]
  }

  public tail(): TItem {
    this._checkOnEmpty()
    return this._list[this._tailIdx]
  }

  public getList() {
    return this._list as TItem[]
  }
}
