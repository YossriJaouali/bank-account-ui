import { Component } from '@angular/core';
import {AccountComponent} from './features/account/account.component';

@Component({
  selector: 'app-root',
  imports: [AccountComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
