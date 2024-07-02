const express = require ('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator'); //middleware for form validation 
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); //installing cors to allow access 

app.listen(45, () => {
  console.log('Server is running on port 45');
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/submit',
  // Validation middleware using express-validator
  [
    body('fullName')
      .notEmpty().withMessage('Full name is required')
      .matches(/^[A-Za-z]*\s{1}[A-Za-z]*$/).withMessage('Full name must contain first and last name'),
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format'),
    body('phone')
      .notEmpty().withMessage('Phone number is required')
      .isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits')
      .isNumeric().withMessage('Phone number must contain only numbers'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  (req, res) => {
    console.log(req.body); 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, password } = req.body;
    // Process the data for post request 

    // success message
    res.json({ message: 'Form submitted successfully', data: req.body });
  }
);
