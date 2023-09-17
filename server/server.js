require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");

// middleware for fetching data from different domain like google.com
app.use(cors());

// middleware
app.use(express.json());

// middleware example 2
// app.use((req,res,next)=>{
//     console.log("Hey iam the middleware")
//     next();
// })

// Get All Restaurants
app.get("/api/v1/restaurants", async (req, res) => {

try {
    const results = await db.query('SELECT * FROM restaurants');
      res.status(200).json({
        status: "Get All Restaurants success",
        results:results.rowCount,
        data: {
          restaurant: [results.rows],
        },
      });
} catch (error) {
    console.log(error)
}
});

// Get One Resataurant
app.get("/api/v1/Restaurants/:id", async (req, res) => {
  try {
    const  results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
    res.status(200).json({
      status: "Get One Resataurant success",
      data: {
        restaurant: [results.rows[0]],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES($1,$2,$3) RETURNING *",[req.body.name, req.body.location, req.body.price_range])
    console.log(results);
    res.status(201).json({
      status: "Create a Restaurant success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const results = await db.query("UPDATE restaurants SET name = $1, location= $2, price_range=$3 where id=$4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id,])
    res.status(200).json({
      status: "Update a Restaurant success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});


// Delete a Restaurant 
app.delete("/api/v1/restaurants/:id", async (req, res)=>{
    try {
        const results = await db.query(" DELETE FROM restaurants where id = $1", [req.params.id])
        res.status(204).json(
            {
                status:"Delete success"
            }
        )
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
