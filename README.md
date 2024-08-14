
# Node.js PostgreSQL Setup and Server Guide

This project demonstrates how to set up a PostgreSQL database, configure a Node.js application to connect to it, and run the server. Below are the steps to install PostgreSQL, make necessary configurations, and start the server.

## Prerequisites

- Node.js and npm installed on your system
- PostgreSQL installed on your system

## Installation Guide

### 1. Install PostgreSQL

Follow the instructions for your operating system to install PostgreSQL:

- **Linux (Debian/Ubuntu):**
  ```bash
  sudo apt update
  sudo apt install postgresql postgresql-contrib
  ```

- **Mac OS:**
  ```bash
  brew install postgresql
  brew services start postgresql
  ```

- **Windows:**
  Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).

### 2. Create a Superuser and a Database

After installing PostgreSQL, you can create a superuser and a database:

1. Switch to the `postgres` user:
   ```bash
   sudo -i -u postgres
   ```

2. Create a new PostgreSQL superuser:
   ```bash
   createuser --interactive --pwprompt
   ```

3. Create a new database:
   ```bash
   createdb techdb
   ```

4. Exit the `postgres` user:
   ```bash
   exit
   ```

### 3. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

### 4. Configure the Database Connection

Open the `db.js` file and update the configuration with your PostgreSQL superuser credentials:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '<your-superuser-password>',
    port: 5432,
});

module.exports = pool;
```

### 5. Set Up the Database

Run the `dbsetup.js` file to create the necessary database tables and functions:

```bash
node dbsetup.js
```

This script will create the `events` table and the functions required to insert, update, and delete event data.

### 6. Start the Server

After setting up the database, you can start the server using the `index.js` file:

```bash
node index.js
```

The server will start, and you can now interact with the API endpoints.

## API Endpoints

- **GET /event_list** - Fetch all events from the database.
- **POST /event** - Insert a new event into the database.
- **PUT /event/:id** - Update an event by ID.
- **DELETE /event/:id** - Delete an event by ID.

## Troubleshooting

If you encounter any issues, please make sure:

- PostgreSQL is running (`sudo service postgresql start` on Linux, or `brew services start postgresql` on Mac).
- The database credentials in `db.js` are correct.
- The `techdb` database has been created and is accessible.
