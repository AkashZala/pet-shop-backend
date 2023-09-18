const pg = require('pg');
const client = new pg.Client('postgres://localhost/petshop_backend_db');
const express = require('express');
const app = express();

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
            SELECT * 
            FROM pets
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    } 
    catch(ex) {
        next(ex);
    }
});

const setup = async () => {
    await client.connect();
    console.log('Connected to database');
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(20)
        );
        INSERT INTO pets (name) VALUES ('Max');
        INSERT INTO pets (name) VALUES ('Cooper');
        INSERT INTO pets (name) VALUES ('Coco');
        INSERT INTO pets (name) VALUES ('Lola');
    `;
    await client.query(SQL);
    console.log('tables created and data seeded');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
};

setup();