// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example in-memory data (to be replaced with database integration)
let events = [
  { id: 1, title: "Event 1", date: "2024-07-15" },
  { id: 2, title: "Event 2", date: "2024-07-20" },
];

// Define CRUD endpoints for events (to be added in Step 2)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET All Events
app.get("/events", (req, res) => {
  let filteredEvents = [...events];

  // Filter by title (case insensitive)
  if (req.query.title) {
    filteredEvents = filteredEvents.filter((event) =>
      event.title.toLowerCase().includes(req.query.title.toLowerCase())
    );
  }

  // Filter by date
  if (req.query.date) {
    filteredEvents = filteredEvents.filter(
      (event) => event.date === req.query.date
    );
  }

  res.status(200).json(filteredEvents);
});

// GET Single Event by ID
app.get("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find((e) => e.id === eventId);
  if (!event) {
    return res.status(404).send("Event not found");
  }
  res.status(200).json(event);
});

// Validation Middleware
function validateEvent(req, res, next) {
  const { title, date } = req.body;
  if (!title || !date) {
    return res
      .status(400)
      .json({ error: "Title and date are required fields" });
  }
  if (!isValidDate(date)) {
    return res
      .status(400)
      .json({ error: "Invalid date format. Use YYYY-MM-DD" });
  }
  next();
}

// Helper function to validate date format
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

// Apply validation middleware to POST and PUT routes
app.post("/events", validateEvent, (req, res) => {
  const { title, date } = req.body;
  const newEvent = {
    id: events.length + 1,
    title,
    date,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put("/events/:id", validateEvent, (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventToUpdate = events.find((e) => e.id === eventId);
  if (!eventToUpdate) {
    return res.status(404).json({ error: "Event not found" });
  }
  eventToUpdate.title = req.body.title;
  eventToUpdate.date = req.body.date;
  res.status(200).json(eventToUpdate);
});

// DELETE Remove an Event by ID
app.delete("/events/:id", (req, res) => {
  const eventId = parseInt(req.params.id);
  const index = events.findIndex((e) => e.id === eventId);
  if (index === -1) {
    return res.status(404).send("Event not found");
  }
  events.splice(index, 1);
  res.status(204).send();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});
