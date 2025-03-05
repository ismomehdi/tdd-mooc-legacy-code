import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
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

  test('"Conjured" items degrade in quality twice as fast as normal items', () => {
    const gildedRose = new Shop([new Item("Conjured", 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });
});
