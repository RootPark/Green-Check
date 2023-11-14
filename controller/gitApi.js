'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../config/common.js";

const postUserInfo = async (rep, res) => {
    const name = req.query.name;
    const baseUrl = "https://api.github.com/users/";

    const url = baseUrl + name;

    console.log(url);
}

export { postUserInfo };