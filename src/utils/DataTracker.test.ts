import DataTracker from "./DataTracker";

describe("DataTracker class", () => {
  describe("showMin", () => {
    test("return null when tracker is empty", () => {
      const tracker = new DataTracker();
      const result = tracker.showMin();

      expect(result).toBeNull();
    });

    test("return first element when tracker has one element", () => {
      const tracker = new DataTracker();
      tracker.insert(5);
      const result = tracker.showMin();

      expect(result).toBe(5);
    });

    test("return minimal value when tracker has many elements", () => {
      const tracker = new DataTracker();
      const valuesToInsert: number[] = [5, 1, 7, -10, -2, 3, 14];
      valuesToInsert.forEach((value) => tracker.insert(value));
      const result = tracker.showMin();

      expect(result).toBe(Math.min(...valuesToInsert));
    });
  });

  describe("showMax", () => {
    test("return null when tracker is empty", () => {
      const tracker = new DataTracker();
      const result = tracker.showMax();

      expect(result).toBeNull();
    });

    test("return first element when tracker has one element", () => {
      const tracker = new DataTracker();
      tracker.insert(5);
      const result = tracker.showMax();

      expect(result).toBe(5);
    });

    test("return maximal value when tracker has many elements", () => {
      const tracker = new DataTracker();
      const valuesToInsert: number[] = [5, 1, 7, -10, 14, 3, -3];
      valuesToInsert.forEach((value) => tracker.insert(value));
      const result = tracker.showMax();

      expect(result).toBe(Math.max(...valuesToInsert));
    });
  });

  describe("showMean", () => {
    test("return null when tracker is empty", () => {
      const tracker = new DataTracker();
      const result = tracker.showMean();

      expect(result).toBeNull();
    });

    test("return first element when tracker has one element", () => {
      const tracker = new DataTracker();
      tracker.insert(5);
      const result = tracker.showMean();

      expect(result).toBe(5);
    });

    test("return mean value when tracker has many elements", () => {
      const tracker = new DataTracker();
      const valuesToInsert: number[] = [-4, 6, -2, 10, 5];
      valuesToInsert.forEach((value) => tracker.insert(value));
      const result = tracker.showMean();

      expect(result).toBe(3);
    });
  });

  describe("showMode", () => {
    test("return null when tracker is empty", () => {
      const tracker = new DataTracker();
      const result = tracker.showMode();

      expect(result).toBeNull();
    });

    test("return first element when tracker has one element", () => {
      const tracker = new DataTracker();
      tracker.insert(5);
      const result = tracker.showMode();

      expect(result).toBe(5);
    });

    test("return mode value when tracker has many elements and one mode", () => {
      const tracker = new DataTracker();
      const valuesToInsert: number[] = [-4, -2, 6, 6, -2, 10, -2, 5, 5];
      valuesToInsert.forEach((value) => tracker.insert(value));
      const result = tracker.showMode();

      expect(result).toBe(-2);
    });

    test("return first mode value when tracker has many elements and two modes", () => {
      const tracker = new DataTracker();
      const valuesToInsert: number[] = [-4, -2, 6, 6, -2, 10, -2, 5, 5, 6];
      valuesToInsert.forEach((value) => tracker.insert(value));
      const result = tracker.showMode();

      expect(result).toBe(-2);
    });
  });

  describe("isEmpty", () => {
    test("return true when insert was never called", () => {
      const tracker = new DataTracker();
      const result = tracker.isEmpty();

      expect(result).toBe(true);
    });

    test("return true when insert was ever called", () => {
      const tracker = new DataTracker();
      tracker.insert(5);
      const result = tracker.isEmpty();

      expect(result).toBe(false);
    });
  });
});
