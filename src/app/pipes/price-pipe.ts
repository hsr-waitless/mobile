import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
@Injectable()
export class PricePipe implements PipeTransform {

  transform(value: number, args) {
    return parseFloat((Math.round(value * 100) / 100).toString()).toFixed(2).toString();
  }
}
