// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // SIGNUP LOGIC
// exports.signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // 1. Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // 2. Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 3. Save the new user
//     user = new User({
//       username,
//       email,
//       password: hashedPassword
//     });
//     await user.save();

//     // 4. Generate a JWT Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(201).json({ 
//   message: "Signup successful!", 
//   token, 
//   user: { id: user._id, username: user.username, email: user.email } 
// });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error during signup" });
//   }
// };

// // LOGIN LOGIC
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Find the user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 2. Check the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 3. Generate a JWT Token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//    res.status(200).json({ 
//   message: "Logged in successfully!", 
//   token, 
//   user: { id: user._id, username: user.username, email: user.email } 
// });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };












const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SIGNUP LOGIC
exports.signup = async (req, res) => {
  try {
    // 1. Log incoming data (Terminal mein check karo kya aa raha hai)
    console.log("Incoming Registration Data:", req.body);

    const { username, email, password } = req.body;

    // 2. Extra Validation (Manual check before Mongoose)
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: `Missing fields: ${!username ? 'username ' : ''}${!email ? 'email ' : ''}${!password ? 'password' : ''}` 
      });
    }

    // 3. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Save the new user
    user = new User({
      username: username.trim(), // Trim to remove accidental spaces
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    await user.save();

    // 6. Generate a JWT Token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secret_fallback', // Safety check for secret
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      message: "Signup successful!", 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });

  } catch (error) {
    console.error("🔴 Signup Controller Error:", error);
    res.status(500).json({ message: "Server error during signup", error: error.message });
  }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secret_fallback', 
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      message: "Logged in successfully!", 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (error) {
    console.error("🔴 Login Controller Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
