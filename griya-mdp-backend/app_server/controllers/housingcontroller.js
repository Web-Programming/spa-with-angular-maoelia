const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Semua field harus diisi',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Password tidak cocok',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar',
      });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'kunci_rahasia_griya_mdp', { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah',
      });
    }

    const token = jwt.sign({ id: user._id }, 'kunci_rahasia_griya_mdp', { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ success: true, data: user });
};

// Update Profile
const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json({ success: true, data: user });
};

// GET all housing
const Index = async (req, res) => {
  res.json({
    success: true,
    message: 'Get all housing',
  });
};

// GET my housing
const GetMyHousing = async (req, res) => {
  res.json({
    success: true,
    message: `Get housing for user ${req.user.id}`,
  });
};

// GET housing by ID
const GetById = async (req, res) => {
  res.json({
    success: true,
    message: `Get housing id ${req.params.id}`,
  });
};

// CREATE housing
const Create = async (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Housing created',
  });
};

// UPDATE housing
const Update = async (req, res) => {
  res.json({
    success: true,
    message: `Housing ${req.params.id} updated`,
  });
};

// DELETE housing
const Delete = async (req, res) => {
  res.json({
    success: true,
    message: `Housing ${req.params.id} deleted`,
  });
};

module.exports = {
  // auth
  register,
  login,
  getProfile,
  updateProfile,

  // housing
  Index,
  GetMyHousing,
  GetById,
  Create,
  Update,
  Delete,
};
