'use strict';
import dotenv from 'dotenv';
dotenv.config();

import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from '../config/common.js';

// ------------------ users ----------------------

const getUsers = async (req, res) => {
    const query = 'SELECT * from user;';
    const results = {};
    results.result = true;
    results.error = [];
    results.userCount = 0;
    results.users = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query);
            for (let i = 0; i < rows.length; i++) {
                results.users.push(rows[i]);
                results.userCount++;
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

// ------------------ commits ----------------------

const getCommits = async (req, res) => {
    const query = 'SELECT * from commits;';
    const results = {};
    results.result = true;
    results.error = [];
    results.commits = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query);
            for (let i = 0; i < rows.length; i++) {
                results.commits.push(rows[i]);
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
    timeLog('[GET] commits called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ user-info ----------------------

const getuserInfo = async (req, res) => {
    const query = 'SELECT * from user WHERE name = ?;';
    const queryData = req.query.name;
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
            results.user= rows[0];
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
    timeLog('[GET] user-info called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

export { getUsers, getCommits, getuserInfo };