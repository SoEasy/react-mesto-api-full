import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useRxValue } from '../hooks/useRxValue';
import { todoService } from '../services/todo.service';

export const TodoPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const userTodos = useRxValue(todoService.userTodos$(userId), null);
  useEffect(() => {
    todoService.loadTodos(userId);
  }, [])

  if (!userTodos) {
    return null;
  }

  return <div>
    <span>Status: {userTodos.status}</span>
    <ul>
      {userTodos.items.map(todo => <li key={todo.title}>{todo.title} - {todo.isDone ? 'done' : 'working'}</li>)}
    </ul>
  </div>;
}
