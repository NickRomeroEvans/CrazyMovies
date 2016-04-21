# What is this?
An experiment in creating an Angular 2 application.
Based off of codedamn angular2 tutorial

This demonstrates how to use Auth0 for front end 
authentication and how to send that data to a backend.
Also how an Angular 2 application can interact with a REST API.
Rendering movie names and images on the screen.

This application shows features of Angular 2 using
components to specify elements and logic on the page.

Shows how to take advantage of the app life cycle.

Angular 2 needing to be bootstrapped using the root component for the app.

Use the ngOnInit lifecycle event to wait for our child components to initialize first.

directives: An array of the Components or Directives that this template requires.
providers: An array of dependency injection providers for services that the component requires. 

#Structure
The basic structure is an index.html imports all our libraries
and the Angular 2 application located in main.ts.

main.ts contains the bootstrap of our application taking in our root component 'MyMainApp' as well as some providers for our component.

'MyMainApp' contains the logic used for login, verifying loggedIn and logout.
Since 'MyMainApp' is the root component of my application it also made since for it to have the route configurations for applcation. Inside the template there is a router outlet which displays the views.

After the user logins, the application makes a request to the server for all movies that the client has not rated. If there are any they are displayed to the client who can then accept and reject them in order.
After words the client can look at their 'cart' which makes a request to the server and gives back all movies the user accepted and all of the movies they rejected.

I decided to use Auth0 because I wanted this project to be about learning about third party authentication and incorporating it into a full stack.

Back end focused on filtering unauthorised api calls
and verifying that an authorised API call is being made.
also demonstrates how to use Spring to create a REST API
and to fulfill dependencies using autowired.
