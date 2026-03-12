import { api } from "../../../api/axios"

type Contact = {
    fullname: string,
    avatar?: string
    max_link?: string
    phoneNumber?: string
}


export const contactService = {
  getContacts: async (role: string): Promise<Contact[]> => {
    const response = await api.get(`/users`, {params: {userRole:role}})
    return response.data;
  }}