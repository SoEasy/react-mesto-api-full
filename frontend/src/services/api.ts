import { User, TodoItem } from '../types';

class Api {
  private url: string;
  private headers: Record<string, string> = {};

  constructor(url: string, headers: Record<string, string>) {
    this.url = url;
    this.headers = headers;
  }

  private _handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText)
    }
  }

  private _handleResponseError(err: string) {
    return Promise.reject(err)
  }

  loadUsers(): Promise<Array<User>> {
    return fetch(`${this.url}/users`)
      .then(
        response => this._handleResponse<{users: Array<User>}>(response)
      ).then(
        ({ users }) => users
      ).catch(
        this._handleResponseError
      );
  }

  getUserTodos(userId: User['id']): Promise<Array<TodoItem>> {
    return fetch(`${this.url}/todo/${userId}`)
      .then(response => this._handleResponse<{ todos: Array<TodoItem> }>(response))
      .then(({ todos }) => todos)
      .catch(this._handleResponseError)
  }

  register(email: string, password: string, name: string) {
    return fetch(`${this.url}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (
        JSON.stringify({ email, password, name })
      )
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  login(email: string, password: string) {
    return fetch(`${this.url}/auth/signIn`,  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (
        JSON.stringify({ email, password })
      )
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  logout(): Promise<void> {
    return fetch(`${this.url}/auth/logout`)
      .then(r => this._handleResponse<void>(r))
      .catch(this._handleResponseError)
  }

  checkMe(): Promise<void> {
    return fetch(`${this.url}/auth/me`)
      .then(r => this._handleResponse<void>(r))
      .catch(this._handleResponseError)
  }
}

export const api = new Api(
  'https://api.vhaldemario.students.nomoreparties.co',
  {
    'Content-Type': 'application/json'
  }
);
