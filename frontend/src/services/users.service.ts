import { BehaviorSubject } from 'rxjs';
import { api } from './api';
import { User } from '../types';

class UsersService {
  users$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  constructor() {
    const users: Array<User> = [];
    api.loadUsers().then((users: Array<User>) => {
      this.users$.next(users);
    });
  }
}

export const usersService = new UsersService();
