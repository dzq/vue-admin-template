/**
 * API列表
 */
import { BaseAPI } from '@/api/base'
import { User } from '@/api/user'
export var user = new User()
export var order = new BaseAPI("/order")
export var model = new BaseAPI("/model")

