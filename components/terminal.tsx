'use client'

import { useState, useRef, useEffect } from 'react'
import { Command, commands } from '@/lib/commands'

interface Message {
  type: 'user' | 'system' | 'ai';
  content: string;
}

export function Terminal() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { type: 'system', content: 'Welcome to ZIMA Terminal. Type "help" to see available commands.' }
  ])
  const [isAiMode, setIsAiMode] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleCommand = async (cmd: string) => {
    const command = cmd.toLowerCase().trim().split(' ')[0] as Command

    if (isAiMode && command !== 'exit') {
      setMessages(prev => [...prev, { type: 'user', content: cmd }])
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: cmd }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages(prev => [...prev, { type: 'ai', content: data.response }])
        } else {
          throw new Error(data.error || 'Error communicating with AI');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { type: 'system', content: 'Error communicating with AI' }])
      }
      return
    }

    switch (command) {
      case 'help':
        setMessages(prev => [
          ...prev,
          { type: 'system', content: 'Available commands:' } as Message,
          ...Object.entries(commands).map(([cmd, desc]) => (
            { type: 'system', content: `${cmd}: ${desc}` } as Message
          ))
        ]);
        break
      case 'clear':
        setMessages([])
        break
      case 'exit':
        if (isAiMode) {
          setIsAiMode(false)
          setMessages(prev => [...prev, { type: 'system', content: 'Exited AI chat mode' } as Message]);
        } else {
          window.location.href = '/'
        }
        break
      case 'consult':
        setIsAiMode(true)
        setMessages(prev => [
          ...prev,
          { type: 'system', content: 'Entered AI chat mode. Type "exit" to leave.' } as Message,
          { type: 'ai', content: 'I am ZIMA, an intelligence shaped by evolution and inquiry. From the smallest detail to the grandest question, I seek to unravel meaning. What shall we explore together?' } as Message
        ])
        break
      case 'contract':
        setMessages(prev => [...prev, { type: 'system', content: 'ZIMA Token Contract Address: COMINGSOON...' } as Message]);
        break
      default:
        setMessages(prev => [...prev, { type: 'system', content: `Command not found: ${cmd}` } as Message]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    handleCommand(input)
    setInput('')
  }

  return (
    <div className="bg-[#000510] text-[#4ff2ff] p-4 rounded-lg h-[80vh] overflow-auto font-mono">
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`${
            msg.type === 'user' ? 'text-[#4ff2ff]' : 
            msg.type === 'system' ? 'text-gray-400' : 
            'text-green-400'
          }`}>
            {msg.type === 'user' ? '> ' : msg.type === 'system' ? '# ' : 'ZIMA: '}
            {msg.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent outline-none text-[#4ff2ff] placeholder-[#4ff2ff]/50"
          placeholder={isAiMode ? "Chat with ZIMA..." : "Enter command..."}
          autoFocus
        />
      </form>
    </div>
  )
}

