const User = require('../models/User.js');

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID
 *                 firstName:
 *                   type: string
 *                   description: The user's first name
 *                 lastName:
 *                   type: string
 *                   description: The user's last name
 *                 companyName:
 *                   type: string
 *                   description: The user's company name
 *                 industry:
 *                   type: string
 *                   description: The user's industry
 *                 companyAddress:
 *                   type: string
 *                   description: The user's company address
 *                 zipCode:
 *                   type: string
 *                   description: The user's zip code
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 phone:
 *                   type: string
 *                   description: The user's phone number
 *                 logo:
 *                   type: string
 *                   description: The user's logo (URL or base64 encoded)
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *       500:
 *         description: Failed to get user profile
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
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               logo:
 *                 type: string
 *                 nullable: true
 *                 description: The user's logo (URL or base64 encoded, optional)
 *     responses:
 *       200:
 *         description: User profile updated successfully
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
 *                   description: The updated user object
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *       500:
 *         description: Failed to update user profile
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
const getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findUserById(parseInt(userId));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get user profile', error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, companyName, industry, companyAddress, zipCode, phone, logo } = req.body;

    // Construct the update data object, only including fields that are provided
    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (companyName !== undefined) updateData.companyName = companyName;
    if (industry !== undefined) updateData.industry = industry;
    if (companyAddress !== undefined) updateData.companyAddress = companyAddress;
    if (zipCode !== undefined) updateData.zipCode = zipCode;
    if (phone !== undefined) updateData.phone = phone;
    if (logo !== undefined) updateData.logo = logo; // Allows setting logo to null explicitly

    const user = await User.updateUser(parseInt(userId), updateData);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user profile', error: error.message });
  }
};

/**
 * @swagger
 * /api/users/company:
 *   put:
 *     summary: Update current user company
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         description: User company updated successfully
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
 *                   description: The updated user object
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message
 *       500:
 *         description: Failed to update user company
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
const updateUserCompany = async (req, res) => {
  try {
    const userId = req.userId;
    const { companyName, industry, companyAddress, zipCode } = req.body;

    const user = await User.updateUser(parseInt(userId), {
      companyName,
      industry,
      companyAddress,
      zipCode,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User company updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user company', error: error.message });
  }
};

module.exports = { getCurrentUserProfile, updateUserProfile, updateUserCompany };
