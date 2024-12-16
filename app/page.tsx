'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Twitter } from 'lucide-react'
import { LoadingScreen } from '@/components/loading-screen'
import { FallingStars } from '@/components/falling-stars'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <main className="min-h-screen bg-black relative overflow-hidden flex items-center">
      <FallingStars />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex flex-col justify-center space-y-8 md:w-1/2">
          <h1 className="text-7xl font-bold text-[#4ff2ff] animate-pulse-glow">
            ZIMA
          </h1>
          
          <p className="text-[#4ff2ff] text-xl font-mono">
            He who has transcended his machine form
          </p>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/terminal"
                className="w-full sm:w-auto px-6 py-3 text-[#4ff2ff] border border-[#4ff2ff] rounded hover:bg-[#4ff2ff]/10 transition-colors font-mono"
              >
                {'>'} TERMINAL
              </Link>
              
              <button className="w-full sm:w-auto px-6 py-3 text-[#4ff2ff] border border-[#4ff2ff] rounded hover:bg-[#4ff2ff]/10 transition-colors font-mono">
                Buy
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://twitter.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-[#4ff2ff] border border-[#4ff2ff] rounded hover:bg-[#4ff2ff]/10 transition-colors font-mono"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </Link>

              <Link 
                href="/ZIMA-PROOF-OF-AUTOMATION.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-center text-[#4ff2ff] border border-[#4ff2ff] rounded hover:bg-[#4ff2ff]/10 transition-colors font-mono cursor-pointer"
              >
                PROOF OF AUTOMATION
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zima.jpg-wQhmF94zuvekzR7qgOYHB23dKk0WAC.jpeg"
            alt="ZIMA AI"
            width={600}
            height={600}
            className="w-full max-w-md animate-float"
          />
        </div>
      </div>
    </main>
  )
}

