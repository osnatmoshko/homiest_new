export class Product {
  productID: number;
  productName: string;
  categoryID: number;
  categoryName: string;
  companyID: number;
  companyName: string;
  description: string;
  price: number;
  imageURL?: string;  
  lastUpdated: Date;

  constructor(
    productID: number,
    productName: string,
    categoryID: number,
     categoryName: string,
    companyID: number,
    companyName: string,
    description: string,
    price: number,
    lastUpdated: Date,
    imageURL?: string
  ) {
    this.productID = productID;
    this. productName= productName;
    this.categoryID = categoryID;
    this.categoryName= categoryName;
    this.companyID = companyID;
    this.companyName = companyName;
    this.description = description;
    this.price = price;
    this.lastUpdated = lastUpdated;
    this.imageURL = imageURL;
  }
}