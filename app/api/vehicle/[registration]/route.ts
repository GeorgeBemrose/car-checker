import { NextRequest, NextResponse } from 'next/server'
import { getValidToken } from '@/lib/token/tokenManager'

const GOV_API_BASE_URL = 'https://history.mot.api.gov.uk/v1/trade/vehicles/registration/'

// export async function GET(
//   request: NextRequest,
//   context: { params: { registration: string } }
// ) {
//   const registration = context.params.registration


//   if (!process.env.GOV_API_KEY) {
//     return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
//   }

//   // Validate registration number format
//   const isValidRegistration = /^[A-Za-z0-9]+$/.test(registration)
//   if (!isValidRegistration) {
//     return NextResponse.json({ error: 'Invalid registration format' }, { status: 400 })
//   }
//   try {
//     // Fetch a valid token
//     const token = await getValidToken()

//     // Make request to GOV API
//     const response = await fetch(GOV_API_BASE_URL + registration, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'X-API-Key': process.env.GOV_API_KEY!,
//         'Accept': 'application/json',
//       },
//     })


//     if (!response.ok) {
//       if (response.status === 404) {
//         return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
//       }

//       throw new Error('Failed to fetch vehicle data')
//     }

//     const data = await response.json()

//     return NextResponse.json(data)
//   } catch (error) {
//     console.error('Error fetching vehicle data:', error)
//     return NextResponse.json({ error: 'Failed to fetch vehicle data' }, { status: 500 })
//   }
// }

async function getVehicleData(registration: string) {
  if (!process.env.GOV_API_KEY) {
    throw new Error('API key not configured')
  }

  const token = await getValidToken()

  const response = await fetch(GOV_API_BASE_URL + registration, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-API-Key': process.env.GOV_API_KEY!,
            'Accept': 'application/json',
          },
        })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Vehicle not found')
    }
    throw new Error('Failed to fetch vehicle data')
  }

  return response.json()
}

export async function GET(request: NextRequest) {
  const registration = request.nextUrl.pathname.split('/').pop()

  if (!registration) {
    return NextResponse.json({ error: 'Registration number is required' }, { status: 400 })
  }

  try {
    const data = await getVehicleData(registration)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching vehicle data:', error)
    if (error instanceof Error && error.message === 'Vehicle not found') {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to fetch vehicle data' }, { status: 500 })
  }
}
