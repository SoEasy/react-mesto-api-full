import { BehaviorSubject, Observable } from 'rxjs';
import { defaultIfEmpty, distinctUntilChanged, map, startWith } from 'rxjs/operators';
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

    setTimeout(() => {
      this.store = {
        ...this.store,
        [userId]: {
          status: 'done',
          items: new Array(Math.round(Math.random() * 10)).fill(0).map((_, i) => ({ title: i.toString(), isDone: Math.random() > 0.5 }))
        }
      }
      this.store$.next(this.store);
    }, 2000);
  }
}

export const todoService = new TodoService();
