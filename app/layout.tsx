import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zima Blue',
  description: 'An AI that has transcended its machine mind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
        </body>
    </html>
  )
}

