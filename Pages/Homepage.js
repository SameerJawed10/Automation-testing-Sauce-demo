class Homepage {
  constructor(page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getTitleText() {
    return await this.headerTitle.textContent();
  }
}

export default Homepage;