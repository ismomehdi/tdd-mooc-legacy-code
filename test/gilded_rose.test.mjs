import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  // this validation test covers the legacy code.
  // ideally, we would replace this with more specific tests
  test("legacy code", () => {
    const qualities = [-1, 0, 1, 49, 50, 51];
    const sellIns = [-1, 0, 1, 2, 6, 10, 11];
    const names = ["foo", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"];

    let itemsForShop = [];
    for (let name of names) {
      for (let quality of qualities) {
        for (let sellIn of sellIns) {
          itemsForShop.push(new Item(name, sellIn, quality));
        }
      }
    }

    const gildedRose = new Shop([...itemsForShop]);
    const items = gildedRose.updateQuality();

    items.forEach((item) => {
      expect(item).toMatchSnapshot();
    });
  });

  test("should default to empty items array", () => {
    const gilderRose = new Shop();
    const items = gilderRose.updateQuality();
    expect(items).to.be.an("array").that.is.empty;
  });

  test.each([[1], [2], [3], [4], [5], [10], [100], [1000]])(
    '"Conjured" item degrades by 2 units when quality and sellIn are positive (integer: %i)',
    (positiveInteger) => {
      const gildedRose = new Shop([new Item("Conjured", positiveInteger, positiveInteger)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(Math.max(0, positiveInteger - 2));
    },
  );

  test('"Conjured" item does not degrade quality below 0', () => {
    const gildedRose = new Shop([new Item("Conjured", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
