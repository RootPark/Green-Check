'use strict';
import dotenv from 'dotenv';
dotenv.config();

import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from '../config/common.js';

// ------------------ users ----------------------

const getUsers = async (req, res) => {
    const query = 'SELECT * FROM user;';
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
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[GET] users called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ all-users ----------------------

const getAllUsers = async (results) => {
    const query = 'SELECT name FROM user;';
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
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    return results;
};

// ------------------ commits ----------------------

const getCommits = async (req, res) => {
    const query = 'SELECT * FROM commits;';
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
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[GET] commits called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ user-info ----------------------

const getuserInfo = async (req, res) => {
    const query = 'SELECT * FROM user WHERE name = ?;';
    const queryData = req.query.name;
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
            results.user = rows[0];
        } catch (err) {
            results.result = false;
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[GET] user-info called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ user-commits ----------------------

const getuserCommits = async (req, res) => {
    const query = 'SELECT * FROM commits WHERE userName = ?;';
    const queryData = req.query.name;
    const results = {};
    results.result = true;
    results.error = [];
    results.commits = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
            for (let i = 0; i < rows.length; i++) {
                results.commits.push(rows[i]);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[GET] user-commits called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ date-commits ----------------------

const getDateCommits = async (req, res) => {
    const query = 'SELECT * FROM commits WHERE created LIKE ?;';
    const queryYear = req.query.year;
    const queryMonth = req.query.month;
    const queryDate = req.query.date;
    const queryData = [`%${queryYear}-${queryMonth}-${queryDate}%`];

    const results = {};
    results.result = true;
    results.error = [];
    results.commits = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
            for (let i = 0; i < rows.length; i++) {
                results.commits.push(rows[i]);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[GET] date-commits called // ' + JSON.stringify(req.query) + '//' + JSON.stringify(results));

};

// ------------------ write-user-info ----------------------

const writeUserInfo = async (name, image, results) => {
    const query = 'INSERT INTO user(name, image) VALUES (?,?);';

    const queryData = [name, image];

    results.result = true;
    results.commits = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error' + err.message);
    }


    return results;
};

// ------------------ write-commits ----------------------

const writeCommits = async (Id, userName, repo, created, results) => {
    const query = 'INSERT INTO commits(Id, userName, repo, created) VALUES (?,?,?,?);';

    const queryData = [Id, userName, repo, created];

    results.result = true;
    results.commits = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, field] = await connection.query(query, queryData);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error : ' + err.message);
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error : ' + err.message);
    }


    return results;
};



export { getUsers, getAllUsers, getCommits, getuserInfo, getuserCommits, getDateCommits, writeUserInfo, writeCommits };