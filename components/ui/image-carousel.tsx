'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  autoPlayInterval?: number
}

export function ImageCarousel({ images, autoPlayInterval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }, [currentIndex, goToSlide, images.length])

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(slideInterval)
  }, [nextSlide, autoPlayInterval])

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] max-h-[400px] group">
      <div className="relative h-full w-full rounded-2xl bg-center bg-cover duration-500 overflow-hidden">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all w-3 h-3 bg-white rounded-full
                ${currentIndex === index ? "p-2" : "bg-opacity-50"}
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

