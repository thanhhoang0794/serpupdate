import { Sequelize } from 'sequelize-typescript';
import { PostgresDialect } from '@sequelize/postgres';
import Domain from './models/domain';
import Keyword from './models/keyword';

const sequelize = new Sequelize({
   dialect: 'postgres',
   host: process.env.DB_HOST || 'localhost', // Update the host if needed
   port: Number(process.env.DB_PORT) || 5432, // Specify the port if needed
   username: process.env.DB_USER || 'postgres',
   password: process.env.DB_PASSWORD || '',
   ssl: true,
   database: process.env.DB_NAME || 'postgres',
   pool: {
      max: 5,
      min: 0,
      idle: 10000,
   },
   logging: false,
   models: [Domain, Keyword],
});

export default sequelize;
