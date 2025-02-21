// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Linktree Clone',
  description: 'A futuristic Linktree clone built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Meta theme */}
      <head>
        <meta name="theme-color" content="#000" />
      </head>

      <body className="bg-black text-white">{children}</body>
    </html>
  );
}