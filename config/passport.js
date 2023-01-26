import GoogleStrategy from "passport-google-oauth20"

function passportFile(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:9000/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            done(null, profile)
        }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        done(null, id)

    })
}

export default passportFile