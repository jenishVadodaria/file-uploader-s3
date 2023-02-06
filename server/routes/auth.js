import * as dotenv from "dotenv"
dotenv.config();
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router()

const CLIENT_URL = "http://localhost:3000"

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: "/login/failed" }),
    (req, res) => {
        //Here req.session.passport.user will give the user_id after the user is serialized.
        res.redirect(`${CLIENT_URL}/upload`)
    })


// @desc    Success Login
// @route   GET /auth/login/success
router.get('/login/success', (req, res) => {
    if (req.user) {

        const { id, googleId, displayName, firstName, lastName, image, createdAt } = req.user
        const limitedData = { googleId, displayName, firstName, lastName, image, createdAt }

        // generate JWT token
        const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        res.status(200).json({
            success: true,
            message: "successfull",
            token,
            user: limitedData,
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
