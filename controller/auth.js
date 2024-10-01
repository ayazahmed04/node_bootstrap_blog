const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mysql = require('mysql')
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWD,
   database: process.env.DATABASE_NAME,
})

exports.register = async (req, res) => {
   const { name, email, password, passwordConfirm } = req.body

   db.query(
      'SELECT email FROM users WHERE email = ?',
      [email],
      (err, results) => {
         if (err) {
            console.log(err)
         } else {
            res.render('register', { message: 'Email is already in use' })
            console.log(results)
         }
         if (password != passwordConfirm) {
            res.render('register', { message: "Passwod didn't match" })
         }
      }
   )

   let hashedPassword = await bcrypt.hash(password, 8)

   db.query(
      'INSERT INTO users SET ?',
      {
         name: name,
         email: email,
         password: hashedPassword,
      },
      (err, result) => {
         if (err) {
            console.log(err)
         } else {
            return res.render('register', {
               message: 'User Added successfully',
            })
         }
      }
   )

   console.log(req.body)
   console.log('Form Submitted successfully')
   // res.send('form Submitted')
}
