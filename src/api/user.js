import { BaseAPI } from '@/api/base'
import request from '@/utils/request'

export class User extends BaseAPI {
  constructor() { super('/user') }

  /**
   * 获取验证码
   */
  getCode() {
    return request({
      url: this.prefix + `/getCode`,
      method: 'get'
    })
  }

  /**
   * 用户登录
   * @param {*} data
   */
  login(data) {
    return request({
      url: this.prefix + '/login',
      method: 'post',
      data
    })
  }
  /**
   * 管理员用户混合登录
   * @param {*} data
   */
  loginMix(data) {
    return request({
      url: this.prefix + '/loginMix',
      method: 'post',
      data
    })
  }

  /**
   * 用户注册
   * @param {*} data
   */
  add(data) {
    return request({
      url: this.prefix + '/register',
      method: 'post',
      data
    })
  }

  /**
   * 获取用户信息
   * @param {用户id} id
   */
  getInfo() {
    return request({
      url: this.prefix + `/info`,
      method: 'get'
    })
  }

  /**
   * 用户注销
   */
  logout() {
    return request({
      url: this.prefix + '/logout',
      method: 'post'
    })
  }
}
