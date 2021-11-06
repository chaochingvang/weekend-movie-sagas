const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//get the list of genres
router.get(`/`, (req, res) => {
  let queryText = `SELECT * FROM "genres";`;

  pool.query(queryText)
    .then((response) => {
      console.log(`/api/genre GET successful!`);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(`ERROR! /api/genre GET fail!`, err);
      res.sendStatus(500);
    });
})


//get the genres of selected movie
router.get('/:id', (req, res) => {
  console.log(`req.params`, req.params.id);

  let id = req.params.id;
  console.log(`req.body.id is`, id);
  
  //grab the genres of movies where id matches
  let queryText = `
    SELECT "name" from "genres"
    JOIN "movies_genres" ON "genres".id = "movies_genres".genre_id
    JOIN "movies" ON "movies".id = "movies_genres".movie_id
    WHERE "movies".id = $1;
  `;

  let values = [id];

  pool.query(queryText, values)
    .then((response) => {
      console.log(`/api/genre/${id} GET successful`);
      console.log(response);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(`ERROR! /api/genre GET error`, err);
      res.sendStatus(500);
    })

});

module.exports = router;