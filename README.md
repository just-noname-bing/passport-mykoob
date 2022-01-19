# passport-mykoob

## Usage

`npm install passport-mykoob --save`

#### Configure Strategy

```typescript
import { Strategy as MykoobStrategy } from "passport-mykoob";
const scopes = ["view-user"];
passport.use(
    new MykoobStrategy(
        {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: process.env.callbackURL,
            scope: scopes,
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                return done(null, profile);
            });
        }
    )
);
```

#### Authentication Requests

Use `passport.authenticate()`, and specify the `'mykoob'` strategy to authenticate requests.

For example, as a route middleware in an Express app:

```typescript
app.get(
    "/auth/mykoob",
    passport.authenticate("mykoob"),
    function (req, res) {}
);
app.get(
    "/callback",
    passport.authenticate("mykoob", { failureRedirect: "/" }),
    function (req, res) {
        res.redirect("/info");
    } // auth success
);
```

## Examples

An Express server example can be found in the `/example` directory. Be sure to `npm install` in that directory to get the dependencies.

## Credits

-   Jared Hanson - used passport-github to understand passport more and kind of as a base.

## License

Licensed under the MIT license. The full license text can be found in the root of the project repository.
