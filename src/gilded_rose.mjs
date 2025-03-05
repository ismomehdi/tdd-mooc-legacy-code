export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Aged Brie") {
        if (item.quality < 50) {
          item.quality += 1;
        }

        item.sellIn -= 1;
        if (item.sellIn < 0 && item.quality < 50) {
          item.quality += 1;
        }
      } else {
        if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.quality < 50) {
            item.quality += 1;
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality += 1;
              if (item.sellIn < 6) {
                item.quality += 1;
              }
            }
          }
          item.sellIn -= 1;
          if (item.sellIn < 0) {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.name !== "Sulfuras, Hand of Ragnaros") {
            if (item.quality > 0) {
              item.quality -= 1;
            }
            item.sellIn = item.sellIn - 1;
            if (item.sellIn < 0) {
              if (item.quality > 0) {
                item.quality -= 1;
              }
            }
          }
        }
      }
    });
    return this.items;
  }
}
