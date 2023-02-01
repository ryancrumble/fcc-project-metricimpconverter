import express from 'express'
import cors from "cors"
import dotenv from "dotenv";

dotenv.config()

import apiRoutes from './routes/api.js'
import fccTestingRoutes from './routes/fcctesting.js'
import runner from './test-runner.js'
import ConvertHandler from "./controllers/convertHandler.js";

const convertController = new ConvertHandler()

let app = express();

app.use('/public', express.static('/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Index page (static HTML)
app.route('/')
    .get(function (req, res) {
        res.sendFile(process.cwd() + '/views/index.html');
    });

app.get('/api/convert', (req, res) => {
    const input = req.query.input as string

    const initNum = convertController.getNum(input)
    const initUnit = convertController.getUnit(input)

    // Check if valid input
    if (!initNum && !initUnit) {
        return res.send('invalid number and unit')
    } else if (!initNum) {
        return res.send('invalid number')
    } else if (!initUnit) {
        return res.send('invalid unit')
    }

    const returnNum = convertController.convert(initNum, initUnit);
    const returnUnit = convertController.getReturnUnit(initUnit);

    if (!returnUnit) {
        return res.send("Oops, could not get the return unit")
    }

    const sentenceResult = convertController.getString(initNum, initUnit, returnNum, returnUnit)

    const resultPayload = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: sentenceResult
    }

    return res.send(resultPayload)
})

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

const port = process.env.PORT || 4564;

//Start our server and tests!
app.listen(port, function () {
    console.log("Listening on port " + port);
    if (process.env.NODE_ENV === 'test') {
        console.log('Running Tests...');
        setTimeout(function () {
            try {
                // @ts-ignore
                runner.run();
            } catch (e) {
                console.log('Tests are not valid:');
                console.error(e);
            }
        }, 1500);
    }
});

export default app //for testing
