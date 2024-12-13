"use client"

import { Card } from "@/components/ui/card"

interface NumberPlateProps {
  registration: string
  className?: string
}

export function NumberPlate({ registration, className }: NumberPlateProps) {
  return (
    <div className={`inline-block ${className}`}>
      <Card className="bg-[#FFDD00] border-none px-3 py-2 min-w-[200px]">
        <p className="text-black text-center font-bold tracking-widest text-3xl font-mono">
          {registration.toUpperCase()}
        </p>
      </Card>
    </div>
  )
}