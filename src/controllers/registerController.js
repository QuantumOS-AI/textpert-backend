const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               companyName:
 *                 type: string
 *                 description: The user's company name
 *               industry:
 *                 type: string
 *                 description: The user's industry
 *               companyAddress:
 *                 type: string
 *                 description: The user's company address
 *               zipCode:
 *                 type: string
 *                 description: The user's zip code
 *               email:
 *                 type: string
 *                 description: The user's email
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               password:
 *                 type: string
 *                 description: The user's password
 *               logo:
 *                 type: string
 *                 nullable: true
 *                 description: The user's logo (URL or base64 encoded, optional)
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 user:
 *                   type: object
 *                   description: The registered user object
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       500:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *                 error:
 *                   type: string
 *                   description: The error message
 */
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, companyName, industry, companyAddress, zipCode, email, phone, password, logo } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.createUser({
      firstName,
      lastName,
      companyName,
      industry,
      companyAddress,
      zipCode,
      email,
      phone,
      password: hashedPassword,
      logo: logo || null, // Set logo to null if not provided
    });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Send the response
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

module.exports = registerUser;
