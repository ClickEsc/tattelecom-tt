class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  
  // Показать ошибку в консоли
  showError(res) {
    if (res.ok) {
      return res.json();
    }
      console.log(res);
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // Получить список всех пользователей
  getUsers() {
    return fetch(`${this.baseUrl}/users`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(res => this.showError(res))
  }

  // Получить список всех постов в виде массива
  getPosts() {
    return fetch(`${this.baseUrl}/posts`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }

  // Добавить пост
  createPost(post) {
    return fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(post)
    })
      .then(res => this.showError(res))
  }

  // Получить список альбомов
  getAlbums() {
    return fetch(`${this.baseUrl}/albums`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }

  // Получить список фотографий
  getPhotos() {
    return fetch(`${this.baseUrl}/photos`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }
}

export const api = new Api({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  headers: {
    "Content-Type": "application/json"
  }
})