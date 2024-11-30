import { notFound } from 'next/navigation'
import { VehicleDetails } from '@/components/vehicle-details'
import { RegistrationNotFound } from '@/components/registration-not-found'

interface VehicleData {
  registration: string
  make: string
  model: string
  firstUsedDate: string
  fuelType: string
  primaryColour: string
  registrationDate: string
  manufactureDate: string
  engineSize: string
  hasOutstandingRecall: string
  motTests: MotTest[]
}

interface MotTest {
  completedDate: string
  testResult: string
  expiryDate: string
  odometerValue: string
  odometerUnit: string
  odometerResultType: string
  motTestNumber: string
  dataSource: string
  location?: string
  defects?: Defect[]
}

interface Defect {
  text: string
  type: string
  dangerous: boolean
}

async function getVehicleData(registration: string): Promise<VehicleData | null> {
  // This is where you would make the actual API call
  // For demonstration purposes, we'll return null for a specific registration
  if (registration === 'NOT1FOUND') {
    return null;
  }

  // Mock data for other registrations
  return {
    registration: registration,
    make: "Ford",
    model: "Focus",
    firstUsedDate: "2020-01-01",
    fuelType: "Petrol",
    primaryColour: "Silver",
    registrationDate: "2020-01-01",
    manufactureDate: "2019-12-01",
    engineSize: "1598",
    hasOutstandingRecall: "No",
    motTests: [
      {
        completedDate: "2023-02-17T09:17:46.000Z",
        testResult: "PASSED",
        expiryDate: "2024-02-16",
        odometerValue: "30000",
        odometerUnit: "MI",
        odometerResultType: "READ",
        motTestNumber: "12345678",
        dataSource: "DVSA",
        defects: [
          {
            text: "Windscreen wiper blade deteriorated",
            type: "ADVISORY",
            dangerous: false
          }
        ]
      },
      {
        completedDate: "2022-02-15T10:30:00.000Z",
        testResult: "PASSED",
        expiryDate: "2023-02-14",
        odometerValue: "15000",
        odometerUnit: "MI",
        odometerResultType: "READ",
        motTestNumber: "87654321",
        dataSource: "DVSA"
      },
      {
        completedDate: "2021-02-10T11:45:00.000Z",
        testResult: "PASSED",
        expiryDate: "2022-02-09",
        odometerValue: "5000",
        odometerUnit: "MI",
        odometerResultType: "READ",
        motTestNumber: "11223344",
        dataSource: "DVSA"
      }
    ]
  }
}

export default async function ResultsPage({
  params
}: {
  params: { registration: string }
}) {
  const data = await getVehicleData(params.registration)

  if (!data) {
    return <RegistrationNotFound registration={params.registration} />
  }

  return <VehicleDetails vehicle={data} />
}

