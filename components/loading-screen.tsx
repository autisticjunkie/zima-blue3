'use client'

import { useState, useEffect, useRef } from 'react'

const lines = [
  "A MACHINE",
  "WHOSE ORIGINAL PARTS",
  "HAVE HAD TO BE",
  "REPLACED"
]

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const words = lines[currentLineIndex].split(' ')
      if (currentWordIndex < words.length) {
        const timer = setTimeout(() => {
          setCurrentWordIndex(prevIndex => prevIndex + 1)
        }, 200) // Adjust this value to control the speed of word appearance
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prevIndex => prevIndex + 1)
          setCurrentWordIndex(0)
        }, 500) // Delay before moving to the next line
        return () => clearTimeout(timer)
      }
    } else {
      setIsTypingComplete(true)
    }
  }, [currentLineIndex, currentWordIndex])

  const handleAwaken = () => {
    setIsVideoPlaying(true)
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error)
      })
    }
  }

  const handleVideoEnded = () => {
    onLoadingComplete()
  }

  const handleSkip = () => {
    onLoadingComplete()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {isVideoPlaying ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-RemLR5qbzYPiL1I7ynlKSnDIzxxSQX.mp4" type="video/mp4" />
          </video>
          <button 
            onClick={handleSkip}
            className="absolute bottom-4 right-4 px-4 py-2 bg-[#4ff2ff] text-black rounded hover:bg-[#4ff2ff]/80 transition-colors font-mono text-sm"
          >
            Skip
          </button>
        </div>
      ) : (
        <div className="text-center w-4/5 max-w-4xl">
          <div className="space-y-4 min-h-[200px]">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="h-12">
                {lineIndex <= currentLineIndex && (
                  <div className="inline-block">
                    {line.split(' ').map((word, wordIndex) => (
                      <span 
                        key={wordIndex} 
                        className={`inline-block text-[#4ff2ff] text-2xl sm:text-3xl md:text-4xl font-mono mr-2
                          ${lineIndex === currentLineIndex && wordIndex > currentWordIndex ? 'opacity-0' : 'opacity-100'}
                          ${word === 'REPLACED' ? 'animate-flicker' : ''}
                          transition-opacity duration-200`}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {isTypingComplete && (
            <div className="mt-12">
              <button 
                onClick={handleAwaken}
                className="px-6 py-3 border border-[#4ff2ff] text-[#4ff2ff] bg-transparent hover:bg-[#4ff2ff] hover:text-black transition-colors duration-300 font-mono text-xl"
              >
                ENTER TO AWAKEN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

