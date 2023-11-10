'use strict';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config/config.js';
import { consoleBar, timeLog } from './config/common.js';
import { ping } from './controller/system.js';
import { getCommits, getUsers } from './lib/db.js';

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

// ---------------- server start -----------------

app.use('/green-check/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');
