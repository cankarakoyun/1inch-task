import { Injectable, NgZone } from '@angular/core';
import { ethers } from 'ethers';
import { ERC20ABI } from '../constants/ERC20.abi';
import { Token } from '../models/token.model';
import { ToastrService } from 'ngx-toastr';
import { ChainId } from '../config';

declare global {
  interface Window {
    ethereum?: any
  }
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  provider: ethers.BrowserProvider | undefined;
  signer: any;
  address: string | undefined;
  balance: number = 0;
  network: any;

  constructor(private ngZone: NgZone, private toastr: ToastrService) {
  }

  async checkConnection() {
    if (typeof window.ethereum !== 'undefined') {
      this.provider = await new ethers.BrowserProvider(window.ethereum);
      const accounts = await this.provider.listAccounts();
      this.network = (await this.provider.getNetwork()).chainId;
  
      if(accounts.length > 0) {
        this.signer = await this.provider.getSigner();
        this.setAddress(this.signer);  
      }

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.ngZone.run(() => {
          if (accounts.length === 0) {
            this.handleMetaMaskDisconnect();
          } else {
            this.handleMetaMaskAccountsChanged(accounts);
          }
        });
      });
    } else {
      this.toastr.info('Please intall Metamask!')
    }
  }

  async changeNetwork() {
    let chainId = "0x" + ChainId.toString(16);
    
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }]
    }).then(async (res: any) => {
      this.provider = await new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.setAddress(this.signer);  
      this.network = (await this.provider.getNetwork()).chainId;
    });
  }

  private handleMetaMaskDisconnect() {
    this.address = undefined;
    this.provider = undefined;
    this.signer = undefined;
  }

  private async handleMetaMaskAccountsChanged(accounts: string[]) {
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.setAddress(this.signer);
  }

  async connectToMetaMaskWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Connect to MetaMask using the Web3Provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.setAddress(this.signer);
      this.network = (await this.provider.getNetwork()).chainId;
    } else {
      this.toastr.info('Please intall Metamask!')
    }
  }

  private async setAddress(signer: ethers.JsonRpcSigner) {
    this.address = await signer.getAddress();
    this.setBalance(this.address)
  }

  private async setBalance(address: string) {
    let balance: any = await this.provider?.getBalance(address);
    this.balance = parseFloat(ethers.formatEther(balance));
  }

  async getTokenBalance(token: Token) {
    if(token.address === 'native') {
      return this.balance;
    } else {
      const contract: any = new ethers.Contract(token.address, ERC20ABI, this.signer);
      const balance = await contract.balanceOf(this.address);
      return parseFloat(ethers.formatUnits(balance, token.decimal));
    }
  }

  async transferETH(address: string, amount: number) {
    return this.signer.sendTransaction({
      to: address,
      value: ethers.parseEther("" + amount),
    });
  }

  async transferToken(token: Token, address: string, amount: number) {
    const contract: any = new ethers.Contract(token.address, ERC20ABI, this.signer);
    return contract.transfer(address, ethers.parseUnits("" + amount, token.decimal))
  }
  
  

}
