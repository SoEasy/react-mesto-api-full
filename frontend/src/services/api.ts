import { User } from '../types';

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

  private _handleResponseError(err: { message: string }) {
    return Promise.reject(err.message)
  }

  loadUsers(): Promise<Array<User>> {
    return fetch(`${this.url}/users`, {
      headers: this.headers,
    })
      .then(
        response => this._handleResponse<Array<User>>(response)
      ).catch(
        this._handleResponseError
      );
  }

  getUserTodos(userId: User['id']) {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  register(email: string, password: string) {
    return fetch(`${this.url}/signup`, {
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

  login(email: string, password: string) {
    return fetch(`${this.url}/signin`,  {
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

  checkToken(token: string) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

export const api = new Api(
  'https://mesto.nomoreparties.co/v1/cohort-13',
  {
    'Content-Type': 'application/json',
    authorization: '8ed74a04-ed04-4c07-90fb-2948fe98949f',
  }
);
