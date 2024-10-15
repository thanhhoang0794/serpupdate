import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express, { Request, Response } from "express";
import * as AdminJSSequelize from '@adminjs/sequelize';
import { Sequelize } from "sequelize-typescript"; // Importing Sequelize with TypeScript support
import Keyword from "../../database/models/keyword";
import Domain from "../../database/models/domain";

AdminJS.registerAdapter(AdminJSSequelize)

// Initialize Sequelize with PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'serpDevelopment',
  port: Number(process.env.DB_PORT) || 5432,
  models: [Domain, Keyword], // Add your models here
  logging: false,
});

const app = express();

// AdminJS options
const adminOptions = {
  rootPath: "/serp-admin",
  branding: {
    companyName: "My Company",
    withMadeWithLove: false,
  },
  locale: {
    language: "en", // default language
    availableLanguages: ["en"],
    localeDetection: true,
  },
  resources: [
    { resource: Domain },  // Register Domain model as a resource
    { resource: Keyword }, // Register Keyword model as a resource
  ], // Add Sequelize models as resources for AdminJS
};

// Initialize AdminJS with the options
const adminJs = new AdminJS(adminOptions);

// Create the AdminJS router using the Express integration
const adminRouter = AdminJSExpress.buildRouter(adminJs);

// Use the router in your Express app
app.use(adminJs.options.rootPath, adminRouter);

// Express app handler function
const handler = (req: Request, res: Response) => {
  app(req, res, (err) => {
    console.log("express handling");

    if (!res.headersSent) {
      console.warn("no headers sent");
    }

    if (err) {
      console.error(err);
      res.status(err.status || 500).end(err.message);
    } else {
      res.end();
    }
  });
};

// Sync Sequelize models with the database (optional)
sequelize.sync({ alter: true }) // Use alter or force as needed
  .then(() => {
    console.log('Database connected and models synced.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,  // AdminJS uses Express middleware, so we disable Next.js body parser
    externalResolver: true, // Allow the Express server to handle the requests
  },
};
