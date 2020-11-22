import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../types';

type TUser = User | void;

class SessionService {
  user$: BehaviorSubject<TUser> = new BehaviorSubject<TUser>(void 0);
  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user: TUser) => !!user)
  );

  signUp(email: string, password: string): Promise<void> {
    return Promise.resolve();
  }

  singIn(email: string, password: string): Promise<void> {
    return Promise.resolve();
  }

  logout(): Promise<void> {
    this.user$.next(void 0);
    return Promise.resolve();
  }
}

export const sessionService = new SessionService();
