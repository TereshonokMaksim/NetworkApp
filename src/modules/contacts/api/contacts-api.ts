import { ContactUser, GetContactsResponse, SearchContactsParams } from './contacts-api-types';

// Припустимо, у тебе є базовий інстанс axios або fetch (наприклад, apiEngine)
// import { apiEngine } from '../../core/api';

export const fetchContacts = async (): Promise<GetContactsResponse> => {
  // const response = await apiEngine.get<GetContactsResponse>('/contacts');
  // return response.data;
  return { contacts: [], totalCount: 0 }; // Тимчасова заглушка
};

export const searchContacts = async (params: SearchContactsParams): Promise<GetContactsResponse> => {
  // const response = await apiEngine.get<GetContactsResponse>('/contacts/search', { params });
  // return response.data;
  return { contacts: [], totalCount: 0 };
};