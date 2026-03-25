/**
 * API Service calling the local backend
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

export interface BCCommerciale {
  id: string;
  code: string;
  name: string;
  email: string;
  phoneNo: string;
  jobTitle: string;
}

export interface LoginResponse {
  success: boolean;
  user: BCClient | BCCommerciale;
  role: "client" | "commercial";
  message?: string;
}

// In development, the backend usually runs on port 3001
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

/**
 * Fetch clients from the local backend (which proxies to Business Central).
 */
export async function fetchBCClients(): Promise<BCClient[]> {
  const response = await fetch(`${BACKEND_URL}/api/clients`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error fetching clients from backend:", errorBody);
    throw new Error(`Failed to fetch clients: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch existing commerciales.
 */
export async function fetchCommerciales(): Promise<BCCommerciale[]> {
  const response = await fetch(`${BACKEND_URL}/api/commerciales`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error fetching commerciales from backend:", errorBody);
    throw new Error(`Failed to fetch commerciales: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new commerciale.
 */
export async function createCommerciale(data: any): Promise<any> {
  const response = await fetch(`${BACKEND_URL}/api/commerciales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error creating commerciale via backend:", errorBody);
    throw new Error(`Failed to create commerciale: ${response.statusText}`);
  }

  return await response.json();
}

export interface BCArticle {
  id: string;
  number: string;
  displayName: string;
  type: string;
  baseUnitOfMeasure: string;
  unitPrice: number;
  itemCategoryCode: string;
}

/**
 * Fetch articles from the local backend.
 */
export async function fetchBCArticles(): Promise<BCArticle[]> {
  const response = await fetch(`${BACKEND_URL}/api/articles`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error fetching articles from backend:", errorBody);
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Login function.
 */
export async function login(username: string, password: string, role: string): Promise<LoginResponse> {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to log in");
  }

  return await response.json();
}
