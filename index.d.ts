import * as passport from "passport";
import * as express from "express";
import * as oauth2 from "passport-oauth2";
import { OutgoingHttpHeaders } from "http";

import mykoob = Strategy;
declare class Strategy extends oauth2.Strategy {
    constructor(
        options: mykoob.StrategyOptions,
        verify: (
            accessToken: string,
            refreshToken: string,
            profile: mykoob.Profile,
            done: oauth2.VerifyCallback
        ) => void
    );
    // NOTE: A union of function types prevents contextual typing of arguments.
    // tslint:disable-next-line:unified-signatures
    constructor(
        options: mykoob.StrategyOptions,
        verify: (
            accessToken: string,
            refreshToken: string,
            params: any,
            profile: mykoob.Profile,
            done: oauth2.VerifyCallback
        ) => void
    );
    constructor(
        options: mykoob.StrategyOptionsWithRequest,
        verify: (
            req: express.Request,
            accessToken: string,
            refreshToken: string,
            profile: mykoob.Profile,
            done: oauth2.VerifyCallback
        ) => void
    );
    // NOTE: A union of function types prevents contextual typing of arguments.
    // tslint:disable-next-line:unified-signatures max-line-length
    constructor(
        options: mykoob.StrategyOptionsWithRequest,
        verify: (
            req: express.Request,
            accessToken: string,
            params: any,
            refreshToken: string,
            profile: mykoob.Profile,
            done: oauth2.VerifyCallback
        ) => void
    );
    checkScope(
        scope: string,
        accessToken: string,
        cb: (err?: Error | null, value?: any) => void
    ): void;
}

declare namespace Strategy {
    // NOTE: not true for `export import` statements
    // tslint:disable-next-line:strict-export-declare-modifiers
    export import Strategy = mykoob;

    interface _StrategyOptionsBase {
        authorizationURL?: string | undefined;
        tokenURL?: string | undefined;
        clientID: string;
        clientSecret: string;
        callbackURL?: string | undefined;
        customHeaders?: OutgoingHttpHeaders | undefined;
        scope?: string | string[] | undefined;
    }

    interface StrategyOptions extends _StrategyOptionsBase {
        passReqToCallback?: false | undefined;
    }

    interface StrategyOptionsWithRequest extends _StrategyOptionsBase {
        passReqToCallback: true;
    }

    interface Profile extends passport.Profile {
        user_info: {
            user_id: number;
            name: string;
            surname: string;
            email: string;
            country_code: string;
            city: any | null | string; //not sure
        };
        provider: string;
        accessToken: string;
    }
}

export = Strategy;
