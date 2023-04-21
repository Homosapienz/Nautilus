import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../Models/TaxonFilter';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform<T>(items: T[], text: string): T[] {
    if(!items || !text) 
      return items;

    return items.filter((i: T) => {
      return Object.getOwnPropertyNames(i).some(p => 
        (i as any)[p].toLowerCase().includes(text.toLowerCase())
      )
    })
  }
}
