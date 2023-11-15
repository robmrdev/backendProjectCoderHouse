import passport from "passport";
import jwt from 'passport-jwt'
import { PRIVATE_KEY_JWT } from "./constants.js";
import local from 'passport-local'
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2'



const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY_JWT
    }, async (jwt_payload, done) => {
        console.log(jwt_payload)
        try {
            return done(null, jwt_payload.user)
        } catch (error) {
            return done(error)
        }
    }))
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.5ad0c18080110979',
        clientSecret: '76b99decbba37baeb74533ff38ef0762d7117ac4',
        callbackURL: 'http://localhost:8080/api/sessions/github-callback',
        scope: ['user:email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value
            const user = await userModel.findOne({ email });
            if (!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    email,
                    age: 0,
                    password: ''
                }
                const result = await userModel.create(newUser)
                return done(null, result);
            } else {
                return done(null, user);
            }
        } catch (error) {
            return done(error)
        }
    }))


    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, age } = req.body
            const exist = await userModel.findOne({ email: username });
            if (exist) {
                return done(null, false)
            }
            const user = await userModel.create({
                first_name,
                last_name,
                email: username,
                age,
                password: createHash(password)
            })
            return done(null, user)

        } catch (error) {
            return done(`Error on register user ${error.message}`)
        }
    }));

    // passport.use('login', new LocalStrategy({
    //     usernameField: 'email'
    // }, async (username, password, done) => {
    //     try {
    //         const user = await userModel.findOne({ email: username });

    //         if (!user) {
    //             return done(null, false)
    //         }
    //         if (!isValidPassword(password, user.password)) {
    //             return done(null, false)
    //         }
    //         return done(null, user);

    //     } catch (error) {
    //         return done(`Error on Log in ${error.message}`)
    //     }
    // }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    });
}
const cookieExtractor = req =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies['accessTokenCookie']
    }
    return token
}

export default initializePassport



// const LocalStrategy = local.Strategy;

// const initializePassport = () => {

//     passport.use('github', new GitHubStrategy({
//         clientID: 'Iv1.5ad0c18080110979',
//         clientSecret: '76b99decbba37baeb74533ff38ef0762d7117ac4',
//         callbackURL: 'http://localhost:8080/api/sessions/github-callback',
//         scope: ['user:email']
//     }, async (accessToken, refreshToken, profile, done) => {
//         try {
//             const email = profile.emails[0].value
//             const user = await userModel.findOne({email});
//             if (!user) {
//                 const newUser = {
//                     first_name: profile._json.name,
//                     last_name: '',
//                     email,
//                     age: 0,
//                     password: ''
//                 }
//                 const result = await userModel.create(newUser)
//                 return done(null, result);
//             } else {
//                 return done(null, user);
//             }
//         } catch (error) {
//             return done(error)
//         }
//     }))


//     passport.use('register', new LocalStrategy({
//         passReqToCallback: true,
//         usernameField: 'email'
//     }, async (req, username, password, done)=>{
//         try {
//             const {first_name, last_name, age} = req.body
//             const exist = await userModel.findOne({email: username});
//             if (exist){
//                 return done(null, false)
//             }
//             const user = await userModel.create({
//                 first_name,
//                 last_name,
//                 email: username,
//                 age,
//                 password: createHash(password)
//             })
//             return done(null, user)

//         } catch (error) {
//             return done(`Error on register user ${error.message}`)
//         }
//     }));

//     passport.use('login', new LocalStrategy({
//         usernameField: 'email'
//     }, async (username, password, done)=>{
//         try {
//             const user = await userModel.findOne({ email:username });

//             if (!user){
//                 return done(null,false)
//             }
//             if(!isValidPassword(password, user.password)){
//                 return done(null,false)
//             }
//             return done(null, user);

//         } catch (error) {
//             return done(`Error on Log in ${error.message}`)
//         }
//     }));

//     passport.serializeUser((user, done) => {
//         done(null, user._id)
//     });
//     passport.deserializeUser(async (id, done) => {
//         const user = await userModel.findById(id)
//         done(null, user)
//     });
// };

// export default initializePassport;