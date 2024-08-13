const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/demo.html");
});

app.get("/event_list", async (req, res) => {
  try {
    const query = `
        SELECT 
        id,
        event_name,
        image_url,
        description,
        rules,
        entry_fee,
        prize,
        event_lead,
        schedule_day,
        timing,
        location
        FROM events;`;
    const result = await db.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// new event
app.post("/event", async (req, res) => {
  const {
    event_name,
    description,
    rules,
    entry_fee,
    prize,
    event_lead,
    schedule_day,
    timing,
    location,
    image_url,
  } = req.body;
  try {
    await db.query(
      `SELECT insert_event($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)`,
      [
        event_name,
        description,
        rules,
        entry_fee,
        prize,
        event_lead,
        schedule_day,
        timing,
        location,
        image_url,
      ]
    );
    res.status(201).send("Event added successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update Event
app.put("/event/:id", async (req, res) => {
  const { id } = req.params;
  const {
    event_name,
    description,
    rules,
    entry_fee,
    prize,
    event_lead,
    schedule_day,
    timing,
    location,
    image_url,
  } = req.body;
  try {
    await db.query(
      `SELECT update_event($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        event_name,
        description,
        rules,
        entry_fee,
        prize,
        event_lead,
        schedule_day,
        timing,
        location,
        image_url,
      ]
    );
    res.status(200).send("Event updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Event
app.delete("/event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`SELECT delete_event($1)`, [id]);
    res.status(200).send("Event deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
