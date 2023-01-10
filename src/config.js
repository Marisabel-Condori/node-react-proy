import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 8000
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'bd_proy'
export const DB_PORT = process.env.DB_PORT || 3306
export const JET_SECRET = process.env.JET_SECRET || 'notasecreta'
export const TOKEN_KEY = process.env.TOKEN_KEY 
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
