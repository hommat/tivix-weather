class DataTracker {
  private valuesCount: number = 0;
  private valuesSum: number = 0;

  private minValue: number | null = null;
  private maxValue: number | null = null;

  private valuesOccured: { [value: number]: number } = {};
  private valueOccuredTheMost: number | null = null;
  private valueOccuredTheMostCount: number | null = null;

  insert(value: number) {
    this.valuesCount++;
    this.valuesSum += value;

    if (this.valuesCount > 1) this.nextInsert(value);
    else this.firstInsert(value);
  }

  private firstInsert(value: number) {
    this.minValue = value;
    this.maxValue = value;
    this.valuesOccured[value] = 1;
    this.valueOccuredTheMost = value;
    this.valueOccuredTheMostCount = 1;
  }

  private nextInsert(value: number) {
    if (value > this.maxValue!) this.maxValue = value;
    if (value < this.minValue!) this.minValue = value;

    if (!this.valuesOccured[value]) this.valuesOccured[value] = 1;
    else this.updateMode(value);
  }

  private updateMode(value: number) {
    this.valuesOccured[value]++;

    if (this.valuesOccured[value] > this.valueOccuredTheMostCount!) {
      this.valueOccuredTheMost = value;
      this.valueOccuredTheMostCount = this.valuesOccured[value];
    }
  }

  isEmpty(): boolean {
    return this.valuesCount === 0;
  }

  showMin(): number | null {
    return this.minValue;
  }

  showMax(): number | null {
    return this.maxValue;
  }

  showMean(): number | null {
    return this.valuesCount > 0 ? this.valuesSum / this.valuesCount : null;
  }

  showMode(): number | null {
    return this.valueOccuredTheMost;
  }
}

export default DataTracker;
