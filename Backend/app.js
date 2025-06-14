import express from 'express';
import { PORT } from './config/config.js';
import expenseRouter from './routes/expense.routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';



const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v1/expenses', expenseRouter); 

app.get("/", (req, res) => {
    res.send('Welcome to the API');
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});

export default app;