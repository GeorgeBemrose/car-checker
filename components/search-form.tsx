'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function SearchForm() {
  const router = useRouter()
  const [registration, setRegistration] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (registration.trim()) {
      router.push(`/results/${registration.trim().toUpperCase()}`)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 col-span-3 px-">
          <Input
            type="text"
            placeholder="Enter registration (e.g. ABC1234)"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            className="text-center uppercase text-lg"
            maxLength={8}
          />
          <Button type="submit" size="lg">
            Check Vehicle
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

