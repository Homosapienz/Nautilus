import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._isLoading.asObservable();

  constructor() { }

  show(){
    setTimeout(() => {
      this._isLoading.next(true);
    }, 0);
    
  }

  hide(){
    setTimeout(() => {
      this._isLoading.next(false);
    }, 0);
  }
}
