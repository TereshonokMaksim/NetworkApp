export interface ContactUser {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  isOnline: boolean;
  lastSeen: string; // ISO date string
}

export interface GetContactsResponse {
  contacts: ContactUser[];
  totalCount: number;
}

export interface SearchContactsParams {
  query: string;
  page?: number;
  limit?: number;
}