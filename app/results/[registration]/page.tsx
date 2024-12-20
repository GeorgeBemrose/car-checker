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
  motTests: MotTest[]
}

interface MotTest {
  completedDate: string
  testResult: string
  expiryDate: string
  odometerValue: string
  odometerUnit: string
  motTestNumber: string
  defects?: Defect[]
}

interface Defect {
  text: string
  type: string
  dangerous: boolean
}

async function getVehicleData(registration: string): Promise<VehicleData | null> {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicle/${registration}`, { cache: 'no-store' })
  const response = await fetch(`${process.env.VERCEL_URL}/api/vehicle/${registration}`, { cache: 'no-store' })
  
  if (!response.ok) {
    if (response.status === 404) {
      return null
    }
    throw new Error('Failed to fetch vehicle data')
  }

  const data = await response.json()

  // Transform the API response to match our VehicleData interface
  return {
    registration: data.registration,
    make: data.make,
    model: data.model,
    firstUsedDate: data.firstUsedDate,
    fuelType: data.fuelType,
    primaryColour: data.primaryColour,
    registrationDate: data.registrationDate,
    manufactureDate: data.manufactureDate,
    engineSize: data.engineSize,
    motTests: data.motTests 
  }
}

interface PageProps {
  params: Promise<{
    registration: string
  }>
}

export default async function ResultsPage({ params }: PageProps) {
  const { registration } =  await params;

  try {
    const data = await getVehicleData(registration);
    console.log('data: ', data)
    if (!data) {
      return <RegistrationNotFound registration={registration} data={data}/>;
    }

    return <VehicleDetails vehicle={data} />;
  } catch (error) {
    return <RegistrationNotFound registration={registration} data={(error as Error).message}/>;
  }
}

