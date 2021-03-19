import { BaseAPI } from '@/api/base'
import request from '@/utils/request'

export class Menu extends BaseAPI {
  constructor() {
    super('/menu')
  }

  /**
   * 获取验证码
   */
  getTree() {
    return request({
      url: this.prefix + `/getTree`,
      method: 'post'
    })
  }
}
