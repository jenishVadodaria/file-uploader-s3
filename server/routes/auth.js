import express from "express";
import passport from "passport";

const router = express.Router()

const CLIENT_URL = "http://localhost:3000"

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: "/login/failed" }),
    (req, res) => {
        res.redirect(`${CLIENT_URL}/upload`)
    })


// @desc    Success Login
// @route   GET /auth/login/success
router.get('/login/success', (req, res) => {
    if (req.user) {
        console.log(req.user);
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            isAuthenticated: req.isAuthenticated()
        })
    }
})


// @desc    Failed Login
// @route   GET /auth/login/failed
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
})


// @desc    Logout User
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return err; }
        res.redirect(`${CLIENT_URL}/login`);
    })
})

export default router;
