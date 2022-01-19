import "dotenv-safe/config";
import { Strategy } from "../../lib";
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
const app = express();

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

const scopes = ["view-user"];

passport.use(
    new Strategy(
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

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", checkAuth, passport.authenticate("mykoob"), function (req, res) {
    res.redirect("/info");
});

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
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
app.get("/info", checkAuth, (req, res) => {
    res.send(
        `<pre>${JSON.stringify(
            req.user,
            null,
            2
        )}</pre></br>hello world <button onclick="window.location='/logout'">logout</button>`
    );
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(
        `not logged in :( <br/><button onclick="window.location='/auth/mykoob'">login</button>`
    );
}

app.listen(3000, () => {
    console.log("Listening at http://localhost:3000/");
});
