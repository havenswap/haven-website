import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "flowbite"; //tailwind plugin
import "../styles/globals.css";
import "../styles/Navbar.css";
import "../styles/Home.css";
import "../styles/market.css"
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import store from "../storeConfig/store"
import { Provider } from "react-redux";

const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Firebase Web3 Wallet Tracker",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <meta
            name="description"
            content="Welcome to Theon-X, your go-to source for all things Blockchain. Our website is designed to provide you with everything you need to stay up-to-date on the world of digital currencies, from real-time price updates to the latest news and articles."
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
          ></link>

          <link rel="shortcut icon" href="/havenlogo.png" />
          <title> Haven Swap</title>
        </Head>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </Provider>
    </>
  );
}
