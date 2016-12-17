import { get, post, del } from './baseApi'

export function getProfile() {
  return get('profile')
}

export function login(email, password) {
  return post('login', { email, password })
}

export function logout() {
  return del('login')
}

export function createUser(newUser) {
  return post('register', newUser)
}

export function saveUser(user) {
  return post('profile', user)
}

export function changePassword(password, password_confirmation) {
  return post('password', { password, password_confirmation })
}
