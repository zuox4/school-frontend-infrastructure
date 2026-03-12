import { useQuery } from "@tanstack/react-query";
import { contactService } from "../api/contactsApi";

export const useContacts = (type: string) => {
  return useQuery({
    queryKey: [`${type}-contacts-list`],
    queryFn: () => contactService.getContacts(type),
  });
};