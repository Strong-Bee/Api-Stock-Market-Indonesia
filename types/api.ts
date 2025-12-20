export interface ApiEndpoint {
  id: string;
  name: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  status: 'active' | 'deprecated' | 'development';
  category: string;
  rateLimit: string;
  requiresAuth: boolean;
  version: string;
  lastUpdated: string;
}

export interface ApiStats {
  totalEndpoints: number;
  activeEndpoints: number;
  categories: number;
  deprecatedEndpoints: number;
}