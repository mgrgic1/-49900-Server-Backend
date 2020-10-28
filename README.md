# Installation:

- Install PostgreSQL on your computer and create a password for the database.
- If npm isn't installed on your computer, download it here https://www.npmjs.com/get-npm. This will help you with npm commands
- Once pgAdmin is opened, create a database named "CoinDB" (without quotes, case sensitive)
- Once the database is created, go to Schemas > public > Tables
- Create a table named users
- In that table, create 5 columns: id, username, email, createdAt, updatedAt
  - id will be the primary key. It is data type integer
  - username, email, createdAt, updatedAt will be "character varying" data types

- Install required dependencies in your project folder by typing "npm i" (without quotes)
- Once the database is set up and dependencies are installed, create a file named ".env" (without quotes) in the main repo folder. Edit the file and type in LOCAL_DATABASE_PASSWORD='yourpasswordhere', replacing 'yourpasswordhere' with the password you used when setting up PostgreSQL

- Everything should be set up. Type "npm run dev" into your command/terminal. 
- Open a browser and type in "localhost:5000" in the URL. The connection has been established and everything is running fine if you see an "ok" message.

# SQL Dump:

The "dump.sql" file takes the entire CoinDB that I have (tables, columns, etc) and copies it to your pgAdmin so that you have it as well.
To use:

- Delete all tables in your CoinDB on pgAdmin. Go to CoinDB > Schemas > Tables > Right click on each one and delete them (trust me)

- Right click on CoinDB (the main database) and click restore

- At the bottom right of the popup window, choose the format as "sql". Then click the three dots next to Filename. Another popup window will come up

- Navigate to wherever you have the dump.sql file stored. When you find it, click on it and press "Select" on the bottom right corner.

- Once the window closes, press "Restore" on the bottom right corner.

- After a couple of seconds, it should give you a success prompt. Refresh the entire page

- If you go to CoinDB > Schemas > Tables, you'll see all the required tables and columns are there

# Users Commands:
`localhost:5000/users` - GET request to view all users in database

`localhost:5000/users/add` - POST request to add users to database

`localhost:5000/users/edit/id` - PUT request to edit a user by their ID

`localhost:5000/users/remove/id` - DELETE request to remove a user by their ID

# User Goals Commands:
`localhost:5000/userGoals/id` - GET request to view all goals for a specific USER ID. The `id` specified must be the user's id.

`localhost:5000/userGoals/goalById/goalId` - GET request to view a specific goal. The `goalId` specified must be the goal's id

`localhost:5000/userGoals/add` - POST request to add a goal to the database for a specific user.

`localhost:5000/userGoals/edit/goalId` - PUT request to edit a user's goal. The `goalId` specified must be the goal's id

`localhost:5000/userGoals/remove/goalId` - DELETE request to remove a user's goal. Must specify a GOAL ID, not a user id.

# User Expenses Commands:
`localhost:5000/userExpenses/expenseById/expenseId` - GET request to view a specific user expense. Must specify the expenseId (not the user's id)

`localhost:5000/userExpenses/userId` - GET request to view ALL expenses for a particular user. Must specify the user's id

`localhost:5000/userExpenses/add` - POST request to add a new expense to the database for a specific user

`localhost:5000/userExpenses/edit/expenseId` - PUT request to edit a specific expense. Must specify the expense id

`localhost:5000/userExpenses/remove/expenseId` - DELETE request to remove a specific expense. Must specify the expense id
