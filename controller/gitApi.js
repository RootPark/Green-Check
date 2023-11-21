'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import moment from 'moment';
import { consoleBar, timeLog, resSend } from "../config/common.js";
import { writeUserInfo, getAllUsers, writeCommits } from '../lib/db.js';

// ----------- postUserInfo --------------

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
                'Content-Type': 'application/json',
            },
        });

        const image = response.data.avatar_url;

        try {
            await writeUserInfo(name, image, results);
        } catch (err) {
            console.log(err)
            results.result = false;
            results.error.push('writeUserInfo Error : ' + err.message);
        }

    } catch (err) {
        results.result = false;
        results.error.push('Git Api Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[POST] user-info called // ' + JSON.stringify(req.body) + '//' + JSON.stringify(results));

};

// ----------- postDateCommits --------------
const postDateCommits = async (req, res) => {
    const year = req.body.year;
    const month = req.body.month;
    const date = req.body.date;

    const fullDate = year + "-" + month + "-" + date;

    const baseUrl = "https://api.github.com/users/";
    const eventUrl = "/events";

    const results = {};
    results.result = true;
    results.error = [];
    results.commits = []; // Initialize commits array

    try {
        await getAllUsers(results);
    } catch (err) {
        results.result = false;
        results.error.push('getAllUsers Error');
    }

    try {
        for (let i = 0; i < results.users.length; i++) {
            const name = results.users[i].name;
            const url = baseUrl + name + eventUrl;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const commits = response.data;

                const specificCommits = commits.filter(commit => {
                    return commit.created_at.includes(fullDate);
                });

                try {
                    for (let j = 0; j < specificCommits.length; j++) {
                        const Id = specificCommits[j].id;
                        const repo = specificCommits[j].repo.name;
                        const created = moment(specificCommits[j].created_at).add(9, 'hours').toISOString();

                        try {
                            await writeCommits(Id, name, repo, created, results);
                        } catch (err) {
                            results.result = false;
                            results.error.push('writeCommits Error : ' + err.message);
                        }

                    }
                } catch (err) {
                    results.result = false;
                    results.error.push('Error findout commits : ' + err.message);
                }
            } catch (err) {
                results.result = false;
                results.error.push('Error fetching commits for user ' + name);
            }
        }
    } catch (err) {
        results.result = false;
        results.error.push('Git Api Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[POST] date-commits called // ' + JSON.stringify(req.body) + '//' + JSON.stringify(results));
};


// ----------- postDateCommits --------------
const postDateCommitsAuto = async (year, month, date) => {

    const fullDate = year + "-" + month + "-" + date;

    const baseUrl = "https://api.github.com/users/";
    const eventUrl = "/events";

    const results = {};
    results.result = true;
    results.error = [];
    results.commits = []; // Initialize commits array

    try {
        await getAllUsers(results);
    } catch (err) {
        results.result = false;
        results.error.push('getAllUsers Error');
    }

    try {
        for (let i = 0; i < results.users.length; i++) {
            const name = results.users[i].name;
            const url = baseUrl + name + eventUrl;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const commits = response.data;

                const specificCommits = commits.filter(commit => {
                    return commit.created_at.includes(fullDate);
                });

                try {
                    for (let j = 0; j < specificCommits.length; j++) {
                        const Id = specificCommits[j].id;
                        const repo = specificCommits[j].repo.name;
                        const created = moment(specificCommits[j].created_at).add(9, 'hours').toISOString();

                        try {
                            await writeCommits(Id, name, repo, created, results);
                        } catch (err) {
                            results.result = false;
                            results.error.push('writeCommits Error : ' + err.message);
                        }

                    }
                } catch (err) {
                    results.result = false;
                    results.error.push('Error findout commits : ' + err.message);
                }
            } catch (err) {
                results.result = false;
                results.error.push('Error fetching commits for user ' + name);
            }
        }
    } catch (err) {
        results.result = false;
        results.error.push('Git Api Error : ' + err.message);
    }

    res.send(results);
    consoleBar();
    timeLog('[POST] date-commits called // ' + JSON.stringify(req.body) + '//' + JSON.stringify(results));
};

export { postUserInfo, postDateCommits, postDateCommitsAuto };