import {config} from 'dotenv'

config({path: '.env'});

export const {PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE} = process.env;