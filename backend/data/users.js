import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Admin User2',
        email: 'admin2@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Admin User3',
        email: 'admin3@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;