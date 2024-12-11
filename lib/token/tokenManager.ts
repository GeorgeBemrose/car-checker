import { createTokenTable, getStoredToken, storeToken, deleteExpiredTokens } from '../db/dvsa_token'

interface TokenResponse {
  access_token: string
  expires_in: number
}

const url = 'https://login.microsoftonline.com/' + process.env.DVSA_TOKEN_ID + '/oauth2/v2.0/token'

async function fetchNewToken(): Promise<TokenResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.DVSA_CLIENT_ID ?? '',
        client_secret: process.env.DVSA_CLIENT_SECRET ?? '',
        scope: 'https://tapi.dvsa.gov.uk/.default',
      }).toString(),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch token')
  }
  console.log('token: '+ response)
  const data: TokenResponse = await response.json()
  return data
}

export async function getValidToken(): Promise<string> {
  await createTokenTable()
  const storedToken = await getStoredToken()

  if (storedToken && storedToken.expiresAt > new Date()) {
    return storedToken.token
  }

  const { access_token, expires_in } = await fetchNewToken()
  const expiresAt = new Date(Date.now() + expires_in * 1000)
  await storeToken(access_token, expiresAt)
  
  // Clean up expired tokens
  await deleteExpiredTokens()

  return access_token
}

