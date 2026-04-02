import { Component } from '@angular/core';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {

  constructor(private subscribeService: SubscribeService) {
  }

  onSubscribe() {
    this.subscribeService.subscribe();
  }

  onClose(): void {
    this.destroy();
  }

  destroy(): void {
  }

}
