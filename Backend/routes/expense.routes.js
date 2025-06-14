import { Router } from 'express';
import pkg from 'pg';
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
} from '../config/config.js'; // ⬅️ Use your config import

const { Client } = pkg;
const expenseRouter = Router();

const db = new Client({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD?.trim(),
  port: Number(DB_PORT),
  database: DB_DATABASE,
});

await db.connect();

expenseRouter.get('/details', async (req, res) => {
    const {start, end} = req.query;
    console.log(start, end);
    const result = await db.query(
        `SELECT * FROM expensetracker 
   WHERE expensedate::date >= $1::date AND expensedate::date <= $2::date`,
        [start, end]
    );
    res.json(result.rows);
});

expenseRouter.get('/analyzebychart', async (req, res) => {
    const result = await db.query(`SELECT * FROM expensetracker`);
    console.log(result.rows);

    res.json(result.rows);
});

expenseRouter.post('/addexpense', async (req, res) => {
    console.log(req.body);
    const {expenseDate, expenseName, amount} = req.body;
    try {
        await db.query('INSERT INTO expensetracker (expensedate, expensename, amount) VALUES ($1, $2, $3)', [expenseDate, expenseName, amount]);
        console.log("expense added successfully")
    } catch (error) {
        console.log(error);
    }
})

expenseRouter.delete('/details/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        await db.query(`DELETE FROM expensetracker WHERE id=${id}`);
    } catch (error) {
        console.log(error);
    }
    
});

export default expenseRouter;
