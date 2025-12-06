import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 8080;
export const DBURL = process.env.DB;
export const JWT_KEY = process.env.JWT;
export const JWT_EXPIRE_TIME = 30 * 24 * 60 * 60;

export const CLOUDINARY_CLOUD_NAME = process.env.NAME
export const CLOUDINARY_API_KEY =process.env.API_KEY
export const CLOUDINARY_API_SECRET_KEY = process.env.API_SECRET_KEY


export const WEB_CACHE = false;
export const MAX_JSON_SIZE = "10MB";
export const URL_ENCODE = true;

export const REQUEST_TIME = 20 * 60 * 1000;
export const REQUEST_NUMBER = 2000;
