import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserLocalStorageService {
  constructor() {}

  createUser(user) {
    let users = this.getUsers();
    console.log(users);
    if (!this.getByEmail(user.email)) {
      users.push({ ...user, id: this.getId() });
      users = JSON.stringify(users);
      return localStorage.setItem('users', users);
    }
  }

  updateUser(updatedUser) {
    // testear esta
    const users = this.getUsers();
    let index = 0;
    for (let user of users) {
      if (user.id === updatedUser.id) {
        users[index] = updatedUser;
        return localStorage.setItem('users', users);
      }
      index++;
    }
  }

  deleteUser(removedUser) {
    const users = this.getUsers();
    let index = 0;
    for (let user of users) {
      if (user.id === removedUser.id) {
        users.splice(index, 1);
        return localStorage.setItem('users', users);
      }
      index++;
    }
  }

  getUsers() {
    let users = localStorage.getItem('users');
    if (!users) {
      users = JSON.stringify([]);
    }
    return JSON.parse(users);
  }

  getByEmail(email) {
    const users = this.getUsers();
    for (let user of users) {
      if (user.email === email) {
        return true;
      }
    }
    return false;
  }

  getById(id) {
    const users = this.getUsers();
    for (let user of users) {
      if (user.id === id) {
        return true;
      }
    }
    return false;
  }

  getId() {
    const users = this.getUsers();
    return users.length + 1;
  }
}
