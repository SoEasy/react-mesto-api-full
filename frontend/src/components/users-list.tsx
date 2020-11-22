import React from 'react';
import './user.css';
import { useRxValue } from '../hooks/useRxValue';
import { usersService } from '../services/users.service';
import { UserAvatar } from './user-avatar';

export const UsersList: React.FC = () => {
  const users = useRxValue(usersService.users$, []);

  return <div className="users">
    {users.map(user => <UserAvatar user={user} key={user.id} />)}
   </div>;
}
