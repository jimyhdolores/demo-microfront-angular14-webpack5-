import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICommonProduct } from '@commons-lib';
@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule],
})
export class PaymentComponent implements OnInit {
  constructor() {}

  products: ICommonProduct[] = [];

  ngOnInit(): void {
    const productsStorage = localStorage.getItem('products');
    console.log(productsStorage);

    if (productsStorage) {
      this.products = JSON.parse(productsStorage) as ICommonProduct[];
    }
  }
}
