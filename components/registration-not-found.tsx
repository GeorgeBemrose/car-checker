import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RegistrationNotFoundProps {
  registration: string,
  data: string | null
}

export function RegistrationNotFound({ registration, data }: RegistrationNotFoundProps) {
  console.log('data: ', data)
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-md mx-auto space-y-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Back to Search</Link>
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registration Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Sorry, we couldn't find any information for the registration number:
            </p>
            <p className="text-2xl font-bold mb-6">{registration}</p>
            <p className="mb-4">
              Please check the registration number and try again.
              {'data:'+ data}
            </p>
            <Button asChild>
              <Link href="/">New Search</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

