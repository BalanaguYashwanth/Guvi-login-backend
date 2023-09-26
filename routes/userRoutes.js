const express = require("express");
const {
  getUserDetails,
  updateUserDetails,
} = require("../controllers/userController");
const validationToken = require("../middleware/tokenValidation");

const router = express.Router();

/**
 * @openapi
 * '/api':
 *  get:
 *     summary: Access Token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user_id
 *            properties:
 *              user_id:
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
 *                  user_id: 
 *                    type: string
 *                  name:  
 *                    type: string
 *                  email:  
 *                    type: string
 *                  age: 
 *                    type: number
 *                  gender: 
 *                    type: number
 *                  dob: 
 *                    type: string
 *                  phone: 
 *                    type: string
 *                  createdAt: 
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *                  __v: 
 *                    type: number
 */

router.get("/", validationToken ,getUserDetails);

/**
 * @openapi
 * '/api':
 *  post:
 *     summary: Age, Gender, DoB, Phone
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - age
 *              - name
 *              - gender
 *              - dob
 *              - phone
 *            properties:
 *              name:  
 *                 type: string
 *              age: 
 *                 type: number
 *              gender: 
 *                 type: number
 *              dob: 
 *                 type: string
 *              phone: 
 *                 type: string
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
 *                  user_id: 
 *                    type: string
 *                  name:  
 *                    type: string
 *                  email:  
 *                    type: string
 *                  age: 
 *                    type: number
 *                  gender: 
 *                    type: number
 *                  dob: 
 *                    type: string
 *                  phone: 
 *                    type: string
 *                  createdAt: 
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *                  __v: 
 *                    type: number
 */


router.post("/", validationToken,updateUserDetails);

module.exports = router