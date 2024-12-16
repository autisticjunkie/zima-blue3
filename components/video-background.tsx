'use client'

import { useState, useEffect } from 'react'

export function VideoBackground() {
  const [videoEnded, setVideoEnded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoEnded(true)
    }, 5000) // Adjust this value to match your video duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`fixed inset-0 w-full h-full transition-opacity duration-1000 ${videoEnded ? 'opacity-0' : 'opacity-100'}`}>
      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="w-full h-full object-cover"
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-RemLR5qbzYPiL1I7ynlKSnDIzxxSQX.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

