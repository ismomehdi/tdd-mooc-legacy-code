import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([
      new Item("foo", 0, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0),
    ]);
    const items = gildedRose.updateQuality();

    const expected = [
      { name: "foo", sellIn: -1 },
      { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1 },
      { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11 },
    ];

    for (let i = 0; i < items.length; i++) {
      expect(items[i].name).to.equal(expected[i].name);
      expect(items[i].sellIn).to.equal(expected[i].sellIn);
    }
  });
});
