'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Sponsor {
  name: string
  logo: string
  url?: string
}

export default function SponsorScroll({ sponsors }: { sponsors: Sponsor[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  
  // 复制三份sponsors数组以确保无缝滚动
  const tripleSponsors = [...sponsors, ...sponsors, ...sponsors]
  const itemWidth = 200 // logo宽度
  const spacing = 32 // 间距 (space-x-8 = 2rem = 32px)
  const totalWidth = sponsors.length * (itemWidth + spacing)

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1
        // 当滚动到第二组sponsors的末尾时，重置到第一组的相对位置
        if (newPosition >= totalWidth) {
          return newPosition - totalWidth
        }
        return newPosition
      })
    }, 30)

    return () => clearInterval(scrollInterval)
  }, [totalWidth])

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex items-center space-x-8 py-4"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
          transition: 'transform 0.03s linear'
        }}
      >
        {tripleSponsors.map((sponsor, index) => (
          <div 
            key={`${sponsor.name}-${index}`}
            className="flex-shrink-0 w-[200px] h-[100px] hover:scale-105 transition-transform"
          >
            {sponsor.url ? (
              <Link 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
                <span className="sr-only">{sponsor.name}</span>
              </Link>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
                <span className="sr-only">{sponsor.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 