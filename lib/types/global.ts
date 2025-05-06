import type { IStaticMethods } from "flyonui/flyonui";
import type { EthereumProvider } from "./ethereum";

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    HSStaticMethods: IStaticMethods;
  }
}
