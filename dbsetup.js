const pool = require('./db'); // Import the pool from your db.js file

const createTableAndFunctions = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100),
        description VARCHAR,
        rules VARCHAR,
        entry_fee VARCHAR,
        prize VARCHAR,
        event_lead VARCHAR(100),
        schedule_day VARCHAR(10),
        timing VARCHAR,
        location VARCHAR(100),
        image_url VARCHAR
    );
    `;

    const insertEventFunction = `
    CREATE OR REPLACE FUNCTION insert_event(
        _event_name VARCHAR,
        _description VARCHAR,
        _rules VARCHAR,
        _entry_fee VARCHAR,
        _prize VARCHAR,
        _event_lead VARCHAR,
        _schedule_day VARCHAR,
        _timing VARCHAR,
        _location VARCHAR,
        _image_url VARCHAR
    )
    RETURNS VOID AS $$
    BEGIN
        INSERT INTO events (
            event_name, description, rules, entry_fee, prize, event_lead, schedule_day, timing, location, image_url
        ) VALUES (
            _event_name, _description, _rules, _entry_fee, _prize, _event_lead, _schedule_day, _timing, _location, _image_url
        );
    END;
    $$ LANGUAGE plpgsql;
    `;

    const updateEventFunction = `
    CREATE OR REPLACE FUNCTION update_event(
        _id INT,
        _event_name VARCHAR,
        _description VARCHAR,
        _rules VARCHAR,
        _entry_fee VARCHAR,
        _prize VARCHAR,
        _event_lead VARCHAR,
        _schedule_day VARCHAR,
        _timing VARCHAR,
        _location VARCHAR,
        _image_url VARCHAR
    )
    RETURNS VOID AS $$
    BEGIN
        UPDATE events
        SET 
            event_name = _event_name,
            description = _description,
            rules = _rules,
            entry_fee = _entry_fee,
            prize = _prize,
            event_lead = _event_lead,
            schedule_day = _schedule_day,
            timing = _timing,
            location = _location,
            image_url = _image_url
        WHERE id = _id;
    END;
    $$ LANGUAGE plpgsql;
    `;

    const deleteEventFunction = `
    CREATE OR REPLACE FUNCTION delete_event(_id INT)
    RETURNS VOID AS $$
    BEGIN
        DELETE FROM events WHERE id = _id;
    END;
    $$ LANGUAGE plpgsql;
    `;

    try {
        await pool.query(createTableQuery);
        console.log("Table 'events' created successfully.");

        await pool.query(insertEventFunction);
        console.log("insert_event function created successfully.");

        await pool.query(updateEventFunction);
        console.log("update_event function created successfully.");

        await pool.query(deleteEventFunction);
        console.log("delete_event function created successfully.");
    } catch (err) {
        console.error("Error executing SQL queries:", err);
    } finally {
        pool.end(); // Close the pool connection
    }
};

createTableAndFunctions();
