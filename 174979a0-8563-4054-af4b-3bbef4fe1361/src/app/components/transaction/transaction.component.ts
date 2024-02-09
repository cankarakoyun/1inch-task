import { Component, OnInit } from '@angular/core';
import { Tokens } from '../../core/config';
import { Token } from '../../core/models/token.model';
import { Web3Service } from '../../core/services/web3.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  tokens: Token[] = Tokens;
  selectedToken: Token | undefined;
  balance: number = 0;
  amount: number = 0;
  addressReg = /^0x[a-fA-F0-9]{40}$/;
  address: string = '';
  pattern = /^[0-9]*\.?[0-9]*$/;
  transactionHash: string = "";
  showModal: boolean = false;
  type: string = '';



  constructor(public web3Service: Web3Service, private toastr: ToastrService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
  }

  getTokenBalance() {
    const token: any = this.selectedToken;
    this.web3Service.getTokenBalance(token).then(balance => {
      this.balance = balance;
    });
  }

  isValid() {
    if (this.amount === 0 || this.amount > this.balance) {
      this.toastr.error('Check the amount you entered!');
      return false;
    } else if (!this.isValidEtherAddress()) {
      this.toastr.error('Check the address you entered!');
      return false;
    } else {
      return true;
    }
  }

  isValidEtherAddress() {
    return this.addressReg.test(this.address) || this.address === '';
  }

  checkAmount($event: any) {
    const value = $event.target.value;
    if (!this.pattern.test(value)) {
      this.amount = parseFloat(value.substring(0, value.length - 1))
    }
  }

  transfer() {
    if (this.isValid()) {
      this.ngxService.start();
      const token: any = this.selectedToken;
      const transaction = this.selectedToken?.address === 'native' ? this.web3Service.transferETH(this.address, this.amount) : this.web3Service.transferToken(token, this.address, this.amount);
      transaction.then((tx: any) => {
        tx.wait().then((res: any) => {
          this.ngxService.stop();
          this.type = 'success';
          this.transactionHash = res.hash;
          this.clear();
        });
      }).catch((err: any) => {
        this.ngxService.stop();
        this.type = 'error';
        this.clear();
      });
    }
  }

  clear() {
    this.address = '';
    this.amount = 0;
    this.selectedToken = undefined;
  }

  close() {
    this.type = '';
    this.transactionHash = '';
  }
}
 