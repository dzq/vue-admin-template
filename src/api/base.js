import request from '@/utils/request'

export class BaseAPI {
  constructor(prefix) {
    this.prefix = prefix
    console.log(this)
  }
  // prefix;

  /**
   * 获取
   * @param data
   * @returns {AxiosPromise}
   */
  get(data) {
    return request({
      url: this.prefix + '/get',
      method: 'post',
      data
    })
  }
  /**
   * 更新
   * @param data
   * @returns {AxiosPromise}
   */
  update(data) {
    return request({
      url: this.prefix + '/update',
      method: 'post',
      data
    })
  }
  /**
   * 删除
   * @param data
   * @returns {AxiosPromise}
   */
  remove(data) {
    return request({
      url: this.prefix + '/delete',
      method: 'post',
      data
    })
  }

  /**
   * 列表
   * @param data
   * @returns {AxiosPromise}
   */
  list(data) {
    return request({
      url: this.prefix + '/list',
      method: 'post',
      data
    })
  }
  /**
   * 列表
   * @param data
   * @returns {AxiosPromise}
   */
  search(data) {
    return request({
      url: this.prefix + '/search',
      method: 'post',
      data
    })
  }
  /**
   * 添加
   * @param data
   * @returns {AxiosPromise}
   */
  add(data) {
    return request({
      url: this.prefix + '/add',
      method: 'post',
      data
    })
  }
  /**
   * 启用
   * @param data
   * @returns {AxiosPromise}
   */
  enable(data) {
    return request({
      url: this.prefix + '/enable',
      method: 'post',
      data
    })
  }
  /**
   * 禁用
   * @param data
   * @returns {AxiosPromise}
   */
  disable(data) {
    return request({
      url: this.prefix + '/disable',
      method: 'post',
      data
    })
  }
}

