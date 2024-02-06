// Import the AppProps type from next/app
import type { AppProps } from "next/app";
import RootLayout from "./layout";
import "./globals.css"; // Adjust this path to your global CSS file location

// Use the AppProps type to type the props of MyApp
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
