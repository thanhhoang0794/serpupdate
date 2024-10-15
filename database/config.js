module.exports = {
  production: {
    username: "postgres.xizctwzgwvyncfkcihlf" || 'postgres',
    password: "S3RBubd@te!" || '',
    database: process.env.DB_NAME || 'postgres',
    host: "aws-0-ap-southeast-1.pooler.supabase.com" || 'localhost',  // Typically 'localhost' or the IP of your database server
    port: process.env.DB_PORT || 5432,         // Default PostgreSQL port is 5432
    dialect: 'postgres',                       // Change the dialect to 'postgres'
    ssl: true,                                 // Enable SSL
    dialectOptions: {
      bigNumberStrings: true,
    }                      // Optional: disable logging in production
  },
};
