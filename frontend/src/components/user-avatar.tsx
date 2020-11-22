import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

type TUserAvatarProps = {
  user: User;
}

export const UserAvatar: React.FC<TUserAvatarProps> = ({ user }) => {
  return <Link className="user__avatar" to={`/todo/${user.id}`}>
    {user.name}
    {user.avatar}
  </Link>
};
