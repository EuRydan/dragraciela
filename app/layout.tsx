import type { Metadata } from 'next'
import { Noto_Serif, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollToTop } from '@/components/scroll-to-top'
import './globals.css'

const notoserif = Noto_Serif({ 
  subsets: ["latin"],
  variable: '--font-notoserif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dra. Graciela Maciel | Advogada Criminalista — Rio de Janeiro',
  description: 'Advocacia criminal com ética, estratégia e responsabilidade. Dra. Graciela Maciel, advogada criminalista atuante no Rio de Janeiro. Atendimento 24h. OAB/RJ 517.632.',
  keywords: ['advogada criminalista Rio de Janeiro', 'advocacia criminal RJ', 'direito penal', 'Recreio dos Bandeirantes', 'Dra Graciela'],
  alternates: {
    canonical: 'https://www.gracielacriminalista.com.br',
  },
  openGraph: {
    title: 'Dra. Graciela Maciel | Advogada Criminalista',
    description: 'Advocacia criminal com ética, estratégia e responsabilidade. Atendimento 24h no Rio de Janeiro.',
    type: 'website',
    url: 'https://www.gracielacriminalista.com.br',
    locale: 'pt_BR',
  },
}

export const viewport = {
  themeColor: '#6B0E08',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Dra. Graciela Maciel — Advogada Criminalista',
  description: 'Advocacia criminal com ética, estratégia e responsabilidade.',
  url: 'https://www.gracielacriminalista.com.br',
  telephone: '+55-21-97397-1095',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. das Américas, 19005',
    addressLocality: 'Recreio dos Bandeirantes',
    addressRegion: 'RJ',
    postalCode: '22790-704',
    addressCountry: 'BR',
  },
  openingHours: 'Mo-Su 00:00-24:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '31',
  },
  sameAs: [
    'https://www.instagram.com/gracielamaciel.adv/',
    'https://www.facebook.com/profile.php?id=61581332139083',
    'https://www.youtube.com/@gracielacriminalista',
    'https://www.tiktok.com/@gracielamaciel.adv',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${notoserif.variable} ${inter.variable} bg-background scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ScrollToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
