const express = require("express");
const {
  login,
  register,
  current,
} = require("../controllers/authenticationController");
const validationToken = require("../middleware/tokenValidation");

const router = express.Router();

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     summary: Name, Email, Password and Confirm Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - confirmpassword
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *             
 *              confirmpassword:
 *                type: string
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  email:
 *                      type: string
 */

router.post("/register", register);

/**
 * @openapi
 * '/auth/login':
 *  post:
 *     summary: Email and Password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 */

router.post("/login", login);

/**
 * @openapi
 * '/auth/currenUser':
 *  get:
 *     summary: Access Token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - accessToken
 *            properties:
 *              accessToken:
 *                type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 */

router.get("/currentUser", validationToken, current);

module.exports = router;
