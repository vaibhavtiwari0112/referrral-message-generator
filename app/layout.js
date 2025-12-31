import "./globals.css";

export const metadata = {
  title: "Referral Message Generator",
  description: "Generate referral messages for LinkedIn and email",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
