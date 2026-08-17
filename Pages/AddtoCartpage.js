class AddtoCart {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
  }


  async addSingleItemToCart(buttonSelector) {
    await this.page.locator(buttonSelector).click();
  }


  async addMultipleItemsToCart(productsArray) {
    for (const item of productsArray) {
      await this.addSingleItemToCart(item.buttonSelector);
    }
  }

  async clickCartIcon() {
    await this.cartIcon.click();
  }
}

export default AddtoCart;