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
        this.#updateAgedBrie(item);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.#updateBackstagePass(item);
      } else if (item.name === "Conjured") {
        this.#updateConjuredItem(item);
      } else if (item.name !== "Sulfuras, Hand of Ragnaros") {
        this.#updateRegularItem(item);
      }
    });
    return this.items;
  }

  #updateConjuredItem(item) {
    if (item.quality > 0) {
      item.quality -= 2;
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      if (item.quality > 0) {
        item.quality -= 2;
      }
    }
  }

  #updateRegularItem(item) {
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

  #updateBackstagePass(item) {
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
  }

  #updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }

    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }
}
