

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
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // Vercel (HTTPS)
      : 'http://localhost:3000'; // Local (HTTP)

  const apiUrl = `${baseUrl}/api/vehicle/${registration}`;

  try {
      const response = await fetch(apiUrl, { cache: 'no-store' });

      if (!response.ok) {
          if (response.status === 404) {
              return null;
          } else {
              const errorText = await response.text();
              throw new Error(`API request failed with status ${response.status}: ${errorText}`);
          }
      }

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
          const errorText = await response.text();
          throw new Error(`Response is not JSON. Content-Type: ${contentType}, Body: ${errorText}`);
      }

      return await response.json();

  } catch (error) {
      console.error("Error in getVehicleData:", error);
      throw error; // Re-throw for handling in the component
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
    if (!data) {
      return <RegistrationNotFound registration={registration} data={data}/>;
    }

    return <VehicleDetails vehicle={data} />;
  } catch (error) {
    return <RegistrationNotFound registration={registration} data={(error as Error).message}/>;
  }
}

