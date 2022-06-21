import {BasicProduct, Product} from "../types/product";
import {db} from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (product: Product, callback: Function) => {
  const queryString = "INSERT INTO Product (name, description, instock_quantity, price) VALUES (?, ?, ?, ?)"
  
  db.query(
    queryString,
    [product.name, product.description, product.instockQuantity, product.price],
    (err, result) => {
      if (err) {callback(err)};

      const insertId = (<OkPacket> result).insertId;
      callback(null, insertId);
    }
  );
};

export const findOne = (productId: number, callback: Function) => {

    const queryString = `
      SELECT 
        id,
        name,
        description,
        instock_quantity,
        price
      FROM Product
      WHERE id=?`
      
    db.query(queryString, productId, (err, result) => {
      if (err) {callback(err)}
      
      const row = (<RowDataPacket> result)[0];
      const product: Product =  {
        id: row.id,
        name: row.name,
        description: row.description,
        instockQuantity: row.instock_quantity,
        price: row.price,
      }
      callback(null, product);
    });
}

export const findAll = (callback: Function) => {
    const queryString = `
      SELECT 
        id, 
        name,
        description,
        instock_quantity,
        price
      FROM Product AS p`
  
    db.query(queryString, (err, result) => {
      if (err) {callback(err)}
  
      const rows = <RowDataPacket[]> result;
      const products: BasicProduct[] = [];
  
      rows.forEach(row => {
        const product: Product =  {
          id: row.id,
          name: row.name,
          description: row.description,
          instockQuantity: row.instock_quantity,
          price: row.price,
        }
        products.push(product);
      });
      callback(null, products);
    });
}

export const update = (product: Product, callback: Function) => {
  const queryString = `UPDATE Product SET name=?, description=?, instock_quantity=?, price=? WHERE id=?`;

  db.query(
      queryString,
      [product.name, product.description, product.instockQuantity, product.price],
      (err, result) => {
      if (err) {callback(err)}
      callback(null);
      }
  );
}

export const drop = (productId: number, callback: Function) => {
const queryString = `DELETE FROM Product WHERE id=?`;

db.query(
    queryString,
    productId,
    (err, result) => {
    if (err) {callback(err)}
      callback(null);
    }
);
}