import { request } from '@/utils/http/axios';

export interface User {
  username: string;
  avatar: string;
}

export function getUser(uuid: string) {
  return request<User>({
    url: '/api/user/getUser',
    method: 'GET',
    params: {
      uuid
    }
  });
}
