import { BehaviorSubject } from 'rxjs';
import { User } from '../types';

class UsersService {
  users$: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  constructor() {
    const users: Array<User> = [];
    new Array(50).fill(0).forEach((_, i) => {
      users.push({
        id: i.toString(),
        name: `user${i}`,
        avatar: 'avatar',
        email: 'email'
      })
    });
    this.users$.next(users);
  }
}

export const usersService = new UsersService();
