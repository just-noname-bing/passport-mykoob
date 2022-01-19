/**
 * Dependencies
 */
var OAuth2Strategy = require("passport-oauth2"),
    InternalOAuthError = require("passport-oauth2").InternalOAuthError,
    util = require("util");

/**
 * Options for the Strategy.
 * @typedef {Object} StrategyOptions
 * @property {string} clientID
 * @property {string} clientSecret
 * @property {string} callbackURL
 * @property {Array} scope
 * @property {string} [authorizationURL="https://login.mykoob.lv/oauth/authorize"]
 * @property {string} [tokenURL="https://login.mykoob.lv/oauth/token"]
 * @property {string} [scopeSeparator=" "]
 */
/**
 * `Strategy` constructor.
 *
 * @constructor
 * @param {StrategyOptions} options
 * @param {function} verify
 * @access public
 */
function Strategy(options, verify) {
    options = options || {};
    options.authorizationURL =
        options.authorizationURL || "https://login.mykoob.lv/oauth/authorize";
    options.tokenURL =
        options.tokenURL || "https://login.mykoob.lv/oauth/token";
    options.scopeSeparator = options.scopeSeparator || " ";

    OAuth2Strategy.call(this, options, verify);
    this.name = "mykoob";
    this._oauth2.useAuthorizationHeaderforGET(true);
}

/**
 * Inherits from `OAuth2Strategy`
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function (accessToken, done) {
    var self = this;
    this._oauth2.get(
        "https://api.mykoob.lv/v1/user/info-old",
        accessToken,
        function (err, body, res) {
            if (err) {
                console.log(err);
                console.log(accessToken);
                return done(
                    new InternalOAuthError(
                        "Failed to fetch the user profile.",
                        err
                    )
                );
            }

            try {
                var parsedData = JSON.parse(body);
            } catch (e) {
                return done(new Error("Failed to parse the user profile."));
            }

            var profile = parsedData; // has the basic user stuff
            profile.provider = "mykoob";
            profile.accessToken = accessToken;

            return done(null, profile);
        }
    );
};
/**
 * Options for the authorization.
 * @typedef {Object} authorizationParams
 * @property {any} permissions
 */
/**
 * Return extra parameters to be included in the authorization request.
 *
 * @param {authorizationParams} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options) {
    var params = {};
    if (typeof options.permissions !== "undefined") {
        params.permissions = options.permissions;
    }
    if (typeof options.prompt !== "undefined") {
        params.prompt = options.prompt;
    }
    return params;
};

module.exports = Strategy;
