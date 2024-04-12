// ScaffoldEthApp.tsx
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { Provider } from "react-redux";
import { AppComponent } from "~~/components/AppComponent";
import "~~/styles/globals.css";

config.autoAddCss = false;

const baseUrl = process.env.NEXT_PUBLIC_URLL
  ? `https://${process.env.NEXT_PUBLIC_URLL}`
  : `http://localhost:${3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Open Estate",
    template: "%s | Open Estate",
  },
  description: " Open Estate",
  openGraph: {
    title: {
      default: "Open Estate",
      template: "%s | Open Estate",
    },
    description: "Open Estate",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "Open Estate",
      template: "%s | Scaffold-ETH 2",
    },
    description: "Open Estate",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body >
        <AppComponent>{children}</AppComponent>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
