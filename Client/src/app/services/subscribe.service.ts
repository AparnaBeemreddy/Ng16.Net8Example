import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor() { }

  subscribe() {
    alert('Thank you for subscribing!');
  }
}
