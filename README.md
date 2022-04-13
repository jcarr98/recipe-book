# About the app
This app was created as a fun project for me to practice my React and SQL skills. Now, it can be functional for anyone who wants to use it. Original inspiration for this recipe book was from a binder storing a mix of recipes that my mom had collected. People said they wanted copies of that recipe book, so I created a website where you can view the recipes from anywhere.

Stack:
    Frontend:
        React
        Grommet
    Backend:
        Node.js
    Database:
        PostgreSQL

# Accessing the app
General access to view the recipes is available for anyone who wants it. You can view the app at [recipe.jeffreycarr.dev](https://www.recipe.jeffreycarr.dev "Jean's Recipe Book"). If you want access to create your own recipes to be added to the database, please email [jeffrey.carr98@gmail.com](mailto:jeffrey.carr98@gmail.com) requesting access. You will need a Google account.

# Downloading and running locally
The app was made using create-react-app, so it uses npm as a package manager. It should be fairly simple, all it requires is the latest version of React and npm. Once downloaded, run `npm i` in the main directory to install any dependencies. Then, `npm start` will start the development server. Because it connects to a SQL database, you'll also need to download the backend from my Github at [https://github.com/jcarr98/recipe-book-backend](https://github.com/jcarr98/recipe-book-backend). You'll also need your own SQL credentials and Google dev account since the app uses Google Authentication for authorized users.