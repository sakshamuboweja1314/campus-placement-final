// Controller for User-related CRUD operations
// Each handler uses async/await and calls next(err) on errors

const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();
    
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const user = new User({ 
      name: name.trim(), 
      email: normalizedEmail, 
      password: trimmedPassword, 
      role,
      institution: req.body.institution?.trim() || '',
      company: req.body.company?.trim() || ''
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // don't return password
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Login an existing user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const trimmedPassword = password.trim();
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.password !== trimmedPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const safeUser = user.toObject();
    delete safeUser.password; // avoid returning password
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
};

// Get a user by id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.email) delete updates.email; // avoid changing email here, or add logic to validate uniqueness

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
