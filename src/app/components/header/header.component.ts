import { Component } from '@angular/core';
import { Web3Service } from '../../core/services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  signer: any
  address: string | undefined;

  constructor(public web3Service: Web3Service) {
  }
}
