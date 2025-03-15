import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shop-icon.jpg" type="image/jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
