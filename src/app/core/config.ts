import { Token } from "./models/token.model";

export const Tokens: Token[] = [
  {
    address: 'native',
    decimal: 18,
    symbol: 'ETH'
  },
  {
    address: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
    decimal: 6,
    symbol: 'USDT'
  },
  {
    address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
    decimal: 6,
    symbol: 'USDC'
  },
  {
    address: '0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357',
    decimal: 18,
    symbol: 'DAI'
  }
];

export const ChainId: number = 11155111;