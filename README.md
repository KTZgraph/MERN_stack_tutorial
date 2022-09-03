# 1. MERN_stack_tutorial
.
https://www.youtube.com/watch?v=98BzS5Oz5E4&amp;list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE

# 2. MERN Authentication Tutorial

https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT
- https://github.com/iamshaunjp/MERN-Auth-Tutorial

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

## JWT token under the hood https://jwt.io/

But what does this json web token actually look like and how does it work under the hood
https://jwt.io/

### budowa tokena

- skąłda się z 3 cześci oddzielonych kropką

#### Header

Contain the algorith used for the JWT

#### Payload

Contains non-sensitive uesr data (e.g a user id) that the server can use to identity the authenticated user

#### Signature

Used to verify the token by the server
whixh the server can use to verify the authenticity of the token and to make sure it's not been tampered with and that last step is really important [!]
because imagine I login as person `a` and receive a token, then when I get the token I decode it and I change the user email or id isnide the payload someone else's email or id belonging to person `b`
then I could encode it again and send it back to the server with some kind of request to try trick the server into thinking I'm logged in as person `b`
so I can access that other user's data so that's what the signature's there for to verify the server that the token hasn't been changed the way it does this is a little bit complicated but I'm going to try to explaint in a kind of simple way that makes sense.
So first of all when a user sends a successful login or signup request to authenticate themselves the server generates a token it does this by first of all
making the payload and the headers part using the user's details like their unique id
then it hashes both of these things together (`Header` i `Payload` i `sekret`-znany tylko serwerowi są `razem hashowane` i wychodzi `Signature`) with a secret string known only to the server and the result is a `Signature` which is a random string of characters.
Now this unique signature for this user can only ever be made by the server, because only the server knows the secret string `Secret` used to make the signature.
So for this reason the secret string must remain a secret know only to the server because it's the key to unlocking and veryfing the JSON WEB TOKEN
so never publish the secret to anything like github or use it with your public code.
So these three things (`Header`, `Payload`, `Secret`) hash together make up the signature and that signature is then added onto the json web token as the third part (ostatnia trzecia cześć json web tokena) this process is called `signing the token` (cześć `Signature`).
And the other two parts are just the encoded version of the header and the payload individually so once the server's created this token it can send it to the browser and
then from the browser if we ever need to make a request for any resourse that's protected for example we'd send this token along with it.
The server can the use the `secret` and `hash` it with the first two parts of the token (`Header`, `Payload`) to verify the `Signature` if the result of that matches the signature on the token we know that the token hasn't been tampered with. But if they don't match then we know it's not valid and we can refuse access to the user
(server jak dostaje tokena to sobie bierze header i payload hashuje je ze swoim sekretem który zna tylko serwer a potem porównuje czy mu wyszła taka sama wartość jak trzecia cześć JWT czyli Signature)

Now you know a little of the JWT - how it's work under the hood.
Now we need to use them to implement this authentication flow on aour API and the frontend, so that whenever a user either sends a valid signup or login request we create a token for that user and send it back to the browser and for any future requests the browser makes on behalf of rthat user it can send that token along with it
That way we can verify the token on the server and provide access to protected resources like the workouts data to authenticated

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

1. HEADER: (zawiera metadane o tokenie i użytym algorytmie)

- https://auth0.com/blog/rs256-vs-hs256-whats-the-difference/

```javascript
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. PAYLOAD: (dane o użytkowniku jak id albo email)
   wiec na serwerze gdy token jest zdekodowany it can seee which user is authenticated or logged in but IMPORTANT: this payload should not contain any sensitive data like a password because it can be easly decoded by hackers if the connection isn't secure and they get a hold of the token

```javascript
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

3. VERIFY SIGNATURE (Token signature)
   This is what the server utimately uses to verify that the token is valid and that it hasn't been tampered with.
   Now also quickly notice tha when I change something of the right like the payload the encoded version changes as well and not just a purple bit which corresponds to the payload but the signature ass well so changing anything in the decoded version will ultimately change the encoded token including the siignature and that;s important because it means that the server
   is going to be able to check using the signature iif the token has been changed in any way shape or form
   So now what I't like to do is spening a few minutes explaing how the server verifies these tokens and exactly how this signature works right here

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),

your-256-bit-secret

) secret base64 encoded
```

## JWT zmiany jakiego kolwiek pola

- gdy sie coś zmieni w tokenei to nie tylko druga cześć payload się zmienia ale także sygnatura
- nie da się klatwo podrobić tokena tylko zmieniając dane


## JTW instalacja
### backend
```sh
npm install jsonwebtoken
```
