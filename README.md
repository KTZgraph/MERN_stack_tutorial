# 1. MERN_stack_tutorial

https://www.youtube.com/watch?v=98BzS5Oz5E4&amp;list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

# 2. MERN Authentication Tutorial

https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT
- https://jwt.io/

# najtrudniejsza lekcja - REACT CONTEXT - lekcja 11

https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=12

# ikonki googla

https://developers.google.com/fonts/docs/material_symbols

# https://date-fns.org/

biblioteka do formatowania daty
we froncie

```sh
npm install date-fns
```

# Backend

- https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3 5:05

```sh
npm install bcrypt
npm install validator
```


# JSON Web Tokens (theory)
- https://www.youtube.com/watch?v=fYaduF4iUSQ&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=5
JSON WEB TOkes
- so using JSON WEB Tokens is just one way to manage authentication between a frontend and the backend
of the web app and it involves making a special token called a JSON WEB TOKEN  
- on the server when a user sdends a successful login or signup request to the server so the server handles that request 
and if it's happy with the credentails then it will create a json web token for that user and it would then send 
that token back to the client in out case the browser (przeglądarka jest klientem) which we can then access in the frontend application
- and the presence of this web token in the browser would signify to the front-end application that we're currently logged in or authenticated
So we could use the presence or absence of that token to do things like protect certain pages or conditionally show different templates in the react application
- for example if we have a token in the browser meaning the user's authenticated we could show that user the home page or dashboard component 
but if we didn't have that token available in the browser meaning they're logged out or unathenticated then we wouldn't let them see the homepage component and instead 
we'd redirect them to a login page 
So this is how we'd use that token on the fronted 
- but more importantly we'd also use that token to protect resources on the backend (the server)
For example we might want to restrict access to the workouts endpoints on the api so that only authenticated users can access data from them and the way we do that 
is by using this json web token and passing it from the client (the browser) to the api (np żadanie do enpointa /api/workouts) as part of the request headers
so on the API if when a request comes in the server detect that json web token and evaluates it to be valid then we'd allow access to whatever resources the user needs
- but if when the request comes in and the API doesn't detect the web token or determines it to be invalid then we'd send an error back to the clients and that 
error would say something like you need to be authenticated to access this resource 
- So that's the basics of how we'd use a json web token and pass it between the client and the server to handle authentication

But what does this json web token actually look like and how does it work under the hood
https://jwt.io/