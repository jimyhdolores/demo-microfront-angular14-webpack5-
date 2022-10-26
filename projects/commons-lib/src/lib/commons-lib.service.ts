import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICommonProduct } from './models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonsLibService {
  private _products: ICommonProduct[] = [];

  private _channelSource = new BehaviorSubject<number>(0);
  channelPayment$ = this._channelSource.asObservable();

  sendData(product: ICommonProduct): void {
    this._products.push(product);
    localStorage.setItem('products', JSON.stringify(this._products));
    this._channelSource.next(this._products.length);
  }
}
