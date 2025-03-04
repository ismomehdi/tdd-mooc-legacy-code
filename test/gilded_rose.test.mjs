import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();

    const expected = ["foo"];

    for (let i = 0; i < items.length; i++) {
      expect(items[i].name).to.equal(expected[i]);
      expect(items[i].sellIn).to.equal(-1);
    }
  });
});
