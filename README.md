To get the backend running:

- Install PostgreSQL on your computer and create a password for the database.
- Once pgAdmin is opened, create a database named CoinDB
- Once the database is created, go to Schemas > public > Tables
- Create a table named users
- In that table, create 5 columns: id, username, email, createdAt, updatedAt
  - id will be the primary key. It is data type integer
  - username, email, createdAt, updatedAt will be "character varying" data types

- Install required dependencies
- Once the database is set up and dependencies are installed, create a file named ".env" (without quotes) in the main repo folder. Edit the file and type in LOCAL_DATABASE_PASSWORD='yourpasswordhere', replacing 'yourpasswordhere' with the password you used when setting up PostgreSQL

- Type "npm run dev" into your command/terminal. 
- Open a browser and type in "localhost:5000" in the URL. The connection has been established and everything is running fine if you see an "ok" message.
