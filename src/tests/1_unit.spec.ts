import 'mocha'
import {assert} from "chai";
import ConvertHandler from "../controllers/convertHandler.js";

const convertHandler = new ConvertHandler();

describe('Unit Tests', function () {
    it('it reads a whole number input', () => {
        assert.isNumber(convertHandler.getNum('1'))
        assert.isNumber(convertHandler.getNum('1km'))
        assert.equal(convertHandler.getNum('1km'), 1)
    })

    it('it reads a decimal number input', () => {
        assert.isNumber(convertHandler.getNum('1.2'))
        assert.isNumber(convertHandler.getNum('1.2km'))
        assert.equal(convertHandler.getNum('1.2km'), 1.2)
    })

    it('it reads a fractional number input', () => {
        assert.isNumber(convertHandler.getNum('1/2'))
        assert.isNumber(convertHandler.getNum('1/2km'))
        assert.equal(convertHandler.getNum('1/2km'), 0.5)
    })

    it('it reads a decimal fractional number input', () => {
        assert.isNumber(convertHandler.getNum('1.4/2'))
        assert.isNumber(convertHandler.getNum('1.4/2km'))
        assert.equal(convertHandler.getNum('1.4/2km'), 0.7)
    })

    it('it returns an error on a double-fraction', () => {
        assert.isString(convertHandler.getNum('3/2/3'))
        assert.isString(convertHandler.getNum('3/2/3km'))
        assert.equal(convertHandler.getNum('3/2/3km'), 'Invalid number')
    })

    it('it defaults to a numerical input of `1` when no numerical input is provided', () => {
        assert.isString(convertHandler.getNum(''))
        assert.isNumber(convertHandler.getNum('km'))
        assert.equal(convertHandler.getNum(''), 'Invalid number')
        assert.equal(convertHandler.getNum('km'), 1)
    })

});