#!/usr/bin/env node

const app = require('../src/app');

const port = 3010;


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});