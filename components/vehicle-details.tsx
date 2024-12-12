'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MileageGraph } from "@/components/mileage-graph"
import { MotHistoryList } from "@/components/mot-history-list"

interface VehicleDetailsProps {
  vehicle: {
    registration: string
    make: string
    model: string
    firstUsedDate: string
    fuelType: string
    primaryColour: string
    registrationDate: string
    manufactureDate: string
    engineSize: string
    motTests: Array<{
      completedDate: string
      testResult: string
      expiryDate: string
      odometerValue: string
      odometerUnit: string
      motTestNumber: string
      defects?: Array<{
        text: string
        type: string
        dangerous: boolean
      }>
    }>
  }
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Back to Search</Link>
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Vehicle Information - {vehicle.registration}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-medium">{vehicle.make}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-medium">{vehicle.fuelType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Colour</p>
                <p className="font-medium">{vehicle.primaryColour}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Engine Size</p>
                <p className="font-medium">{vehicle.engineSize}cc</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Registration Date</p>
                <p className="font-medium">{new Date(vehicle.firstUsedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {vehicle.motTests.length > 0 ? (
          <Tabs defaultValue="graph" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="graph">Mileage Graph</TabsTrigger>
              <TabsTrigger value="history">MOT History</TabsTrigger>
            </TabsList>
            <TabsContent value="graph">
              <Card>
                <CardHeader>
                  <CardTitle>Mileage History</CardTitle>
                </CardHeader>
                <CardContent>
                  <MileageGraph motTests={vehicle.motTests} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <MotHistoryList motTests={vehicle.motTests} />
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>MOT History</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No MOT history is available for this vehicle.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

