import { ChainItem } from "@/components/modules/product/slider";
import { Bitcoin, Globe, Link, Zap } from "lucide-react";

export const chainData: ChainItem[] = [
   {
      id: 1,
      name: "Ethereum",
      icon: Globe,
      details: "Mainnet • 12.5M+ transactions",
      logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", // Working alternative
   },
   {
      id: 2,
      name: "Bitcoin",
      icon: Bitcoin,
      details: "Layer 1 • Store of value",
      logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", // Working alternative
   },
   {
      id: 3,
      name: "Polygon",
      icon: Link,
      details: "EVM compatible • Low fees",
      logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png", // Working alternative
   },
   {
      id: 4,
      name: "Lightning Network",
      icon: Zap,
      details: "Bitcoin L2 • Instant payments",
      // No logo - will use icon
   },
   {
      id: 5,
      name: "Lightning Network",
      icon: Zap,
      details: "Bitcoin L2 • Instant payments",
      // No logo - will use icon
   },
   {
      id: 6,
      name: "Lightning Network",
      icon: Zap,
      details: "Bitcoin L2 • Instant payments",
      // No logo - will use icon
   },
   {
      id: 7,
      name: "Lightning Network",
      icon: Zap,
      details: "Bitcoin L2 • Instant payments",
      // No logo - will use icon
   },
];
