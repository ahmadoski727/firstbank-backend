const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // Personal Information
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  maidenName: { type: String },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  nationality: { type: String, required: true },
  stateOfOrigin: { type: String, required: true },
  lga: { type: String, required: true },
  
  // Contact Information
  phoneNumber: { type: String, required: true },
  alternativePhone: { type: String },
  email: { type: String, required: true },
  alternativeEmail: { type: String },
  
  // Residential Address
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String },
  country: { type: String, required: true },
  residenceType: { type: String, required: true },
  yearsAtAddress: { type: Number, required: true },
  
  // Employment Information
  employmentStatus: { type: String, required: true },
  occupation: { type: String, required: true },
  employer: { type: String },
  workAddress: { type: String },
  monthlyIncome: { type: String, required: true },
  sourceOfIncome: { type: String, required: true },
  
  // Account Type Selection
  accountType: { type: String, required: true },
  preferredBranch: { type: String, required: true },
  initialDeposit: { type: Number, required: true },
  
  // Identification Details
  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  bvn: { type: String, required: true, minlength: 11, maxlength: 11 },
  nin: { type: String, maxlength: 11 },
  
  // Next of Kin Information
  kinTitle: { type: String, required: true },
  kinFirstName: { type: String, required: true },
  kinLastName: { type: String, required: true },
  kinRelationship: { type: String, required: true },
  kinPhone: { type: String, required: true },
  kinAddress: { type: String, required: true },
  
  // Additional Services
  services: [{ type: String }],
  
  // Agreements
  agreements: {
    termsConditions: { type: Boolean, required: true },
    privacyPolicy: { type: Boolean, required: true },
    dataProcessing: { type: Boolean, required: true },
    marketingConsent: { type: Boolean, default: false },
    declaration: { type: Boolean, required: true }
  },
  
  // Passport Upload
  passportPhoto: { type: String, required: true },
  
  // Application Status
  status: { 
    type: String, 
    enum: ['pending', 'under_review', 'approved', 'rejected'], 
    default: 'pending' 
  },
  
  // Timestamps
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  referenceNumber: { type: String, unique: true }
});

// Generate reference number before saving
applicationSchema.pre('save', function(next) {
  if (!this.referenceNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.referenceNumber = `FBN${timestamp}${random}`;
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);