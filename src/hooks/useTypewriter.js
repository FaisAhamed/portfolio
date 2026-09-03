import { useState, useEffect } from 'react'

export function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 50, pauseTime = 1800 } = {}) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex(prev => prev + 1)
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return displayText
}
