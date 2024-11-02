import sqlite3
import os

# Database file name
db_file = "database.db"

# Check if the database already exists
if os.path.exists(db_file):
    print(f"The database '{db_file}' already exists. It will be modified if needed.")
else:
    print(f"Creating the database '{db_file}'.")

try:
    # Connect to the SQLite3 database (or create it if it doesn't exist)
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Enable foreign key support
    cursor.execute("PRAGMA foreign_keys = ON;")

    # Create the 'Guide' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Guide (
            id VARCHAR(30) PRIMARY KEY,
            title VARCHAR(30),
            audio_id INTEGER,
            FOREIGN KEY (audio_id) REFERENCES audio(id)
        );
    ''')
    conn.commit()

    # Create the 'section' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS section (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text VARCHAR(1024),
            image_id INTEGER,
            guide_id VARCHAR(30),
            name VARCHAR(100),
            FOREIGN KEY (image_id) REFERENCES image(id),
            FOREIGN KEY (guide_id) REFERENCES Guide(id)
        );
    ''')

    conn.commit()
    # Create the 'image' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS image (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path VARCHAR(100)
        );
    ''')
    conn.commit()
    # Create the 'audio' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS audio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path VARCHAR(100)
        );
    ''')

    # Commit the changes
    conn.commit()

    # Verify that tables were created by fetching a list of tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    if tables:
        print("Tables created successfully:", [table[0] for table in tables])
    else:
        print("No tables found in the database. Something went wrong.")

except sqlite3.Error as e:
    print("An error occurred:", e)

finally:
    # Close the connection
    conn.close()

# Check if the database file exists
if os.path.exists(db_file):
    print(f"The database '{db_file}' was created successfully.")
else:
    print(f"Failed to create the database '{db_file}'.")
