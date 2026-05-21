import { GetContactsResponse, SearchContactsParams } from './contacts-api-types';

const mockContacts: GetContactsResponse = {
  contacts: [
    {
      id: 1,
      firstName: 'Олександр',
      lastName: 'Коваленко',
      avatarUrl: 'https://avatar.iran.liara.run/public/12',
      isOnline: true,
      lastSeen: new Date().toISOString(),
    },
    {
      id: 2,
      firstName: 'Марія',
      lastName: 'Шевченко',
      avatarUrl: 'https://avatar.iran.liara.run/public/75',
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      firstName: 'Дмитро',
      lastName: 'Мороз',
      avatarUrl: null,// Перевірка відображення ініціалів, якщо немає фото
      isOnline: false,
      lastSeen: new Date(Date.now() - 86400000).toISOString(), 
    },
  ],
  totalCount: 3,
};

export const fetchContacts = async (): Promise<GetContactsResponse> => {
  return mockContacts;
};

export const searchContacts = async (params: SearchContactsParams): Promise<GetContactsResponse> => {
  const filtered = mockContacts.contacts.filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(params.query.toLowerCase())
  );
  return {
    contacts: filtered,
    totalCount: filtered.length,
  };
};