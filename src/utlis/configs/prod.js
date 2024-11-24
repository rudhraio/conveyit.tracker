import dotenv from 'dotenv';
dotenv.config();

const prod = {
    production: true,
    port: process.env.PORT,
    logger: false,


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

export default prod;