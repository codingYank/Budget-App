import bcrypt from "bcryptjs"

const users = [
  {
    name: "Tyler Schmidt",
    email: "tyler@email.com",
    password: bcrypt.hashSync("12345", 10),
    totalAvailable: 800,
    uncategorized: 100,
  },
]

export default users
