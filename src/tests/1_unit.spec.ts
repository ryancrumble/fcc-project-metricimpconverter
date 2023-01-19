import 'mocha'
import {assert} from "chai";
import ConvertHandler from "../controllers/convertHandler.js";

const convertHandler = new ConvertHandler();

describe('Unit Tests', function () {
    it('it reads a whole number input', () => {
        assert.isNumber(convertHandler.getNum('1'))
        assert.isNumber(convertHandler.getNum('1km'))
    })

    it('it reads a decimal number input', () => {
        assert.isNumber(convertHandler.getNum('1.2'))
        assert.isNumber(convertHandler.getNum('1.2km'))
        assert.equal(convertHandler.getNum('1.2km'), 1.2)
    })


});