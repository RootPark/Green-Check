'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { consoleBar, timeLog, resSend } from "../config/common.js";
import { writeUserInfo } from '../lib/db.js';

const postUserInfo = async (req, res) => {
    const name = req.body.name;

    const baseUrl = "https://api.github.com/users/";

    const url = baseUrl + name;
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type' : 'application/json',
            },
        });

        const image = response.data.avatar_url;

        try {
            await writeUserInfo(name, image, results);
        } catch (err) {
            console.log(err)
            results.result = false;
            results.error.push('writeUserInfo Error');
        }

    } catch (err) {
        results.result = false;
        results.error.push('Git Api Error');
    }
    
    res.send(results);
    consoleBar();
    timeLog('[POST] user-info called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

export { postUserInfo };