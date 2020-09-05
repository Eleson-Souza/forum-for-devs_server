var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'ls-f6d2e61fcbc5a535aa71d1aaf005fcfcce05c5e4.crlizib8w9lo.us-east-1.rds.amazonaws.com',
        user : 'dbmasteruser',
        password : '6{O+q3-#<4FftK)kS6Ac?r_s5R;Nz,Dk',
        database : 'db_forum_devs'
    }
});

module.exports = knex;