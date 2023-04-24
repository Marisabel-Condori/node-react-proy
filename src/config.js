import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 8000
export const DB_USER = process.env.DB_USER || 'admin'
export const DB_PASSWORD = process.env.DB_PASSWORD || '123456789'
export const DB_HOST = process.env.DB_HOST || 'database-1.cgpy6ihkutba.us-east-2.rds.amazonaws.com'
export const DB_DATABASE = process.env.DB_DATABASE || 'database'
export const DB_PORT = process.env.DB_PORT || 3306
export const JET_SECRET = process.env.JET_SECRET || 'notasecreta'
export const TOKEN_KEY = process.env.TOKEN_KEY || 'cb9b64cdbd7df0f1521ceea03369219ccb388db22a0b0cfe1beabffc996390a9bf9b8e11f981abbb88ab3679bb48fe5d3362e79426ac5f062d53e14a98adeeca'
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY || '89d317bcc09b60eb01ecc1bfb3c838ff05ef72eca440cc4eb38a3dc004ce5d2dd5b7d1a88af5ca8f8508910a31f19c62ce00a6f4c91ee0997031bf77ee601dbb'
