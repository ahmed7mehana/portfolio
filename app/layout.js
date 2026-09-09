import Navbar from "../components/Navbar";
import QueryProvider from "../components/QueryProvider";
import "../styles/globals.css";

export const metadata = {
  title: "Ahmed | Front-End Developer",
  description: "Ahmed Mehanna portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}