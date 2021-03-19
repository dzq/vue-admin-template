/**
 * API列表
 */
import { BaseAPI } from '@/api/base'
import { User } from '@/api/user'
import { Menu } from '@/api/menu'
export var user = new User()
export var order = new BaseAPI("/order")
export var model = new BaseAPI("/model")
export var counter = new BaseAPI("/counter")
export var menu = new Menu()

