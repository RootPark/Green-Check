'use strict';
import dotenv from 'dotenv';
dotenv.config();

import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from '../config/common.js';

const getUsers = async (req, res) => {
    const query = 'SELECT * from user;';
    const results = {};
    results.result = true;
    results.error = [];
    results.users = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query);
            for (let i = 0; i < rows.length; i++) {
                results.users.push(rows[i]);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    
    res.send(results);
    consoleBar();
    timeLog('[GET] users called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

export { getUsers };