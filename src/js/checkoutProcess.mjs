import { getLocalStorage } from "./utils.mjs";
let checkoutProcess = {
    itemNumber: 0,
    cart: getLocalStorage("so-cart"),
    key: "so-cart",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        console.log("Hello2.0")
        this.calculateItemSummary();
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);

    },
  calculateItemSummary: function() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      this.cart.forEach(item => { this.itemTotal += (item.Quantity * item.FinalPrice) });
      this.calculateOrdertotal()
      console.log("Get here?")

  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.tax = this.itemTotal * 0.06
      this.cart.forEach((item) => { this.itemNumber += item.Quantity })
      
      if (this.itemNumber == 1) {
      this.shipping = 10
      } else {
          this.shipping = (this.itemNumber - 1 * 2) + 10
      }
      this.orderTotal = this.shipping + this.tax + this.itemTotal
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
      const summary = `<legend>Order Summary</legend>
      <div>
        <p>Item Subtotal(${this.itemNumber})</p>
        <p>$${this.itemTotal}</p>
      </div>
      <div>
        <p>Shipping Estimate</p>
        <p>$${this.shipping}</p>
      </div>
      <div>
        <p>Tax</p>
        <p>$${this.tax}</p>
      </div>
      <div>
        <p>Order Total</p>
        <p>$${this.orderTotal}</p>
      </div>`
      console.log("Hello")

      document.querySelector("#orderSummary").innerHTML = summary
  }
  
}
checkoutProcess.init()
export default checkoutProcess;