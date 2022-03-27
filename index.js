const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))