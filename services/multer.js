const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename to avoid conflicts
  }
});

// File type filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);  // Accept the file
  } else {
      cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false); // Reject the file
  }
};

// File size limit (e.g., 5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;