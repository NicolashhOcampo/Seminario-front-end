import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{border: "solid red", height: "100vh"}}>
        {children}
      </body>
    </html>
  );
}
