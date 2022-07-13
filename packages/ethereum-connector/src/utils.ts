import { AddEthereumChainParameter } from '@web3-wallet/abstract-connector';

/**
 * The largest possible chain ID we can handle.
 * Explanation: https://gist.github.com/rekmarks/a47bd5f2525936c4b8eee31a16345553
 */
export const MAX_SAFE_CHAIN_ID = 4503599627370476;

export const validateChainId = (chainId: number | undefined): never | void => {
  if (
    !chainId ||
    !Number.isInteger(chainId) ||
    chainId <= 0 ||
    chainId > MAX_SAFE_CHAIN_ID
  ) {
    throw new Error(`Invalid chainId ${chainId}`);
  }
};

export const isValidChainId = (chainId: number | undefined): boolean => {
  try {
    validateChainId(chainId);
    return true;
  } catch (_) {
    return false;
  }
};

export const parseChainId = (chainId: string | number): number => {
  return typeof chainId === 'number'
    ? chainId
    : Number.parseInt(`${chainId}`, `${chainId}`.startsWith('0x') ? 16 : 10);
};

export const toHexChainId = (chainId: number): string => {
  return `0x${chainId.toString(16)}`;
};

export const isChainId = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is number => {
  return typeof chainIdOrChainParameter === 'number';
};

export const isAddChainParameter = (
  chainIdOrChainParameter?: number | AddEthereumChainParameter,
): chainIdOrChainParameter is AddEthereumChainParameter => {
  return !isChainId(chainIdOrChainParameter);
};
