import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { api } from './api';
import { User } from '../types';

type TUser = User | void;

class SessionService {
  user$: BehaviorSubject<TUser> = new BehaviorSubject<TUser>(void 0);

  isLoggedIn$: Observable<boolean> = this.user$.pipe(
    map((user: TUser) => !!user)
  );

  signUp(email: string, password: string, name: string = 'Vova'): Promise<void> {
    return api.register(email, password, name).then((response) => {
      console.log(response);
    });
  }

  singIn(email: string, password: string): Promise<void> {
    return api.login(email, password).then((response: any) => {
      const user = response.data;
      user.id = user._id;
      this.user$.next(user);
    });
  }

  logout(): Promise<void> {
    return api.logout().then(() => {
      this.user$.next(void 0);
    });
  }

  init(): Promise<void> {
    return api.checkMe().then((response) => {
      console.log(response);
    });
  }
}

export const sessionService = new SessionService();
