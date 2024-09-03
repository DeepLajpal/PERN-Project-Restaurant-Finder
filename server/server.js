require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");

// middleware for fetching data from different domains like google.com
app.use(cors());

// middleware
app.use(express.json());

// Root Route , Adding this route to avoid 404 error,
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// Get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) AS total_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "Get All Restaurants success",
      results: results.rowCount,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get One Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, TRUNC(AVG(rating),1) AS avg_rating, COUNT(*) AS total_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1",
      [req.params.id]
    );
    res.status(200).json({
      status: "Get One Restaurant success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "Create a Restaurant success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "Update a Restaurant success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "Delete success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "Add Review Success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a Review
app.delete("/api/v1/restaurants/:id/deleteReview", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.status(204).json({
      status: "Delete Review Success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});
