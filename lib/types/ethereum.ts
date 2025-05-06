/**
 * Ethereum provider type definitions
 */

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, handler: (params: unknown) => void) => void;
  removeListener: (
    eventName: string,
    handler: (params: unknown) => void,
  ) => void;
  isMetaMask?: boolean;
}
