/**
 * Business Central API Service
 */

export interface BCClient {
  id: string;
  name: string;
  ville: string;
  tel: string;
  credit: number;
  encours: number;
  limit: number;
  remise: number;
  alerte: string | null;
  derniere: string;
}

const CLIENT_ID = import.meta.env.VITE_BC_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_BC_CLIENT_SECRET;
const TENANT_ID = import.meta.env.VITE_BC_TENANT_ID;
const SCOPE = import.meta.env.VITE_BC_SCOPE;
const API_URL = import.meta.env.VITE_BC_API_URL;

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * Fetch a new OAuth access token using Client Credentials
 */
async function getAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  // Use proxy path /ms-login in development to avoid CORS
  const isDev = import.meta.env.DEV;
  const tokenUrlBase = isDev ? '/ms-login' : `https://login.microsoftonline.com`;
  const tokenUrl = `${tokenUrlBase}/${TENANT_ID}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('scope', SCOPE);

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error fetching BC token:', errorBody);
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  // Set expiry (subtracting a 5-minute buffer)
  tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
  
  return accessToken!;
}

/**
 * Fetch clients from Business Central.
 * Maps BC response fields to the frontend Client structure.
 */
export async function fetchBCClients(): Promise<BCClient[]> {
  const token = await getAccessToken();
  
  // Use proxy path /bc-api in development to avoid CORS
  const isDev = import.meta.env.DEV;
  const finalApiUrl = isDev 
    ? API_URL.replace('https://api.businesscentral.dynamics.com', '/bc-api')
    : API_URL;
  
  const response = await fetch(finalApiUrl, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error fetching BC clients:', errorBody);
    throw new Error(`Failed to fetch clients: ${response.statusText}`);
  }

  const data = await response.json();
  const rawClients = data.value || [];

  // Mapping BC fields (assuming standard BC Customer API structure)
  // Mapping to fields the frontend uses: id, name, ville, tel, credit, encours, limit, remise, alerte, derniere
  return rawClients.map((c: any) => ({
    id: c.number || c.no || c.id || "N/A",
    name: c.displayName || c.name || "Client Inconnu",
    ville: c.city || c.address?.city || "—",
    tel: c.phoneNumber || c.phoneNo || "—",
    credit: c.creditAmount || 0, // BC field might be balance
    encours: c.balance || 0,
    limit: c.creditLimit || 0,
    remise: c.discountPercentage || 0,
    alerte: c.blocked ? "Crédit bloqué" : (c.balance > c.creditLimit && c.creditLimit > 0 ? "Limite dépassée" : null),
    derniere: c.lastModifiedDateTime ? new Date(c.lastModifiedDateTime).toISOString().split('T')[0] : "—",
  }));
}
