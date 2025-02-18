# Connector

A connector is responsible for the details of connecting to a specific wallet application, such as MetaMask or DeFi Wallet. It provides a consistent and standardized interface to the upper layers of your dApp.

Connector is considered low-level entity that usually should not be used directly. Instead, you would typically feed a connector to createWallet or createCurrentWallet to crate an high-level "Wallet" or "CurrentWallet" interface.

```ts
const metaMaskConnector = new MetaMask();
const deFiWalletConnector = new DeFiWallet();
const metamask = createWallet(metaMaskConnector);
const currentWallet = createCurrentWallet([
  metaMaskConnector,
  deFiWalletConnector,
]);
```

## Implement a Connector for a wallet

If you need to implement a connector for a specific wallet, you can easily do so by extending the abstract connector class provided by the @web3-wallet/core package. In most cases, implementing a wallet connector can be accomplished with few lines of code.

```ts
import type { Provider, ProviderRpcError, WalletName } from '@web3-wallet/core';
import { Connector } from '@web3-wallet/core';

import { icon } from './assets';

const providerFilter = (p: Provider) => !!p.isMetaMask;

const _name = 'MetaMask';
export const name = _name as WalletName<typeof _name>;

export class MetaMask extends Connector {
  public static walletName: WalletName<string> = name;
  public static walletIcon: string = icon;
  public name: WalletName<string> = name;

  constructor(options?: Connector['options']) {
    super({
      providerFilter,
      ...options,
    });
  }
}
```

Check out more wallet connector Implementation examples [here](https://github.com/web3-wallet/web3-wallet/tree/main/packages/wallets).
