import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT || 8080;
export const DBURL = process.env.DB;
export const JWT_KEY = process.env.JWT;
export const JWT_EXPIRE_TIME = 30 * 24 * 60 * 60;

export const CLOUDINARY_CLOUD_NAME = "dyfvp3gc1";
export const CLOUDINARY_API_KEY = "643432138926554";
export const CLOUDINARY_API_SECRET_KEY = "kV7dIxVnfYaZyCP60nVkCDbDpxI";


export const WEB_CACHE = false;
export const MAX_JSON_SIZE = "10MB";
export const URL_ENCODE = true;

export const REQUEST_TIME = 20 * 60 * 1000;
export const REQUEST_NUMBER = 2000;
