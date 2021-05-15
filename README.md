# RecipeApp

* A web app for Recipe related functions. It is an outcome of learning and implementing Angular framework.
* Implemented Authentication using Firebase.
* Added appropriate Routes.
* Managed state using NgRx.
* Used Interceptors to add Auth Token to HttpHeader before request leaves the App.
* Used Guards to prevent the loss of unsaved data on page reload.
* Tech Stack : Bootstrap, Angular, Firebase

## Usage

* The app is deployed on [Heroku](https://best-recipe-app.herokuapp.com/).

### Get project on Localhost

* Clone the repository ```https://github.com/PattniVishal/RecipeApp.git```
* Run ```npm install``` to download dependencies.
* Move to project directory and ```ng serve -o```
* The Application should start on localhost at port 4200.

### Development server (Run on localhost)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
