export class CartItem {
  cartItemID: number;
  productID: number;
  quantity: number;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  companyName: string;

  constructor(
    cartItemID: number,
    productID: number,
    quantity: number,
    productName: string,
    price: number,
    description: string,
    imageUrl: string,
    companyName: string
  ) {
    this.cartItemID = cartItemID;
    this.productID = productID;
    this.quantity = quantity;
    this.productName = productName;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.companyName = companyName;
  }
}
