import { api } from './api'
import type { User } from '@/types/user'

export const userService = {
  getUser: (id: string) => api.get<User>(`/users/${id}`),
  updateUser: (id: string, data: Partial<User>) => api.patch<User>(`/users/${id}`, data),
}

