import jwt from "jsonwebtoken";
import { JET_SECRET } from "../config.js";

const secret = JET_SECRET;

export const asignaToken = (data) => {
    return jwt.sign(data, secret)
}

