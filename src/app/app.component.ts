import { Component } from '@angular/core';
import { Web3Service } from './core/services/web3.service';
import { ChainId } from './core/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [Web3Service]
})
export class AppComponent {
  title = '1inch-task';
  public loading = false;
  chainId = ChainId;
  
  constructor(public web3Service: Web3Service) {
    this.web3Service.checkConnection()
  }
}