const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Store the NAME from BC
  identifier: { type: String, required: true }, // Store the login ID (email or client number)
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'commercial'], required: true },
  bcId: { type: String, required: false }, // Reference to BC ID if available
  email: { type: String, required: false }, // Store email for commercials uniqueness
  activated: { type: Boolean, default: true }
}, { timestamps: true });

// Ensure bcId mapping stays unique ONLY for role 'client'
userSchema.index({ bcId: 1 }, { 
  unique: true, 
  partialFilterExpression: { 
    role: 'client',
    bcId: { $type: "string" } 
  } 
});

// Ensure email is unique ONLY for role 'commercial'
userSchema.index({ email: 1 }, { 
  unique: true, 
  partialFilterExpression: { 
    role: 'commercial',
    email: { $type: "string" } 
  } 
});

// Ensure login identifier is unique per role
userSchema.index({ identifier: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
