import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { api } from './api';
import { TodoItem, User } from '../types';

type TUserTodos = {
  status: 'pending' | 'updating' | 'done';
  items: Array<TodoItem>;
};

type TStore = Record<
  string,
  TUserTodos
>;

class TodoService {
  private store: TStore = {};
  private store$: BehaviorSubject<TStore> = new BehaviorSubject<TStore>({});

  userTodos$(userId: User['id']): Observable<TUserTodos> {
    return this.store$.pipe(
      map((s: TStore) => s[userId] || { status: 'pending', items: [] } as TUserTodos),
      distinctUntilChanged()
    );
  }

  loadTodos(userId: User['id']): void {
    this.store = {
      ...this.store,
      [userId]: {
        status: this.store[userId] ? 'updating' : 'pending',
        items: this.store[userId] ? this.store[userId].items : []
      }
    };
    this.store$.next(this.store);

    api.getUserTodos(userId).then(
      (result) => {
        this.store = {
          ...this.store,
          [userId]: {
            status: 'done',
            items: result
          }
        }
        this.store$.next(this.store);
      }
    )
  }
}

export const todoService = new TodoService();
