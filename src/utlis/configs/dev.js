import dotenv from 'dotenv';
dotenv.config();

const dev = {
    production: false,
    port: 3535,
    logger: true,

    database: {
        type: 'moongodb',
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        name: process.env.DBNAME,
        url: process.env.URL
    },
}

export default dev;