'use strict';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';

import config from './config/config.js';
import { consoleBar, timeLog } from './config/common.js';
import { ping } from './controller/system.js';
import { getCommits, getDateCommits, getUsers, getuserCommits, getuserInfo } from './lib/db.js';
import { postDateCommits, postDateCommitsAuto, postUserInfo } from './controller/gitApi.js';

// ------------------ router set -----------------

const serverPort = config.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const router = express.Router();

// -------------------- api --------------------

router.route('/ping').get(ping);
router.route('/users').get(getUsers);
router.route('/commits').get(getCommits);
router.route('/user-info').get(getuserInfo);
router.route('/user-commits').get(getuserCommits);
router.route('/date-commits').get(getDateCommits);
router.route('/user-info').post(postUserInfo);
router.route('/date-commits').post(postDateCommits);

// ---------------- date automation -----------------

cron.schedule('0 0 * * *', () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    postDateCommitsAuto(year, month, date);
});


// ---------------- server start -----------------

app.use('/green-check/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');
