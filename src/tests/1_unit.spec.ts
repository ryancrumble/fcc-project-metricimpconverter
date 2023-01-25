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

    it('correctly reads each valid input unit', () => {
        // Unit without number
        assert.equal(convertHandler.getUnit('km'), 'km')
        assert.equal(convertHandler.getUnit('KM'), 'km')

        // Unit with number
        assert.equal(convertHandler.getUnit('1km'), 'km')
        assert.equal(convertHandler.getUnit('1.2km'), 'km')
        assert.equal(convertHandler.getUnit('1/2km'), 'km')
        assert.equal(convertHandler.getUnit('gal'), 'gal')
        assert.equal(convertHandler.getUnit('3/4gal/123'), 'gal')

        // Case-insensitive
        assert.equal(convertHandler.getUnit('l'), 'l')
        assert.equal(convertHandler.getUnit('L'), 'l')
    })

    it('returns an error for an invalid input', () => {
        assert.equal(convertHandler.getUnit(''), 'Invalid unit')
        assert.equal(convertHandler.getUnit('1'), 'Invalid unit')
        assert.equal(convertHandler.getUnit('potato'), 'Invalid unit')
        assert.equal(convertHandler.getUnit('ll'), 'Invalid unit')
        assert.equal(convertHandler.getUnit('kms'), 'Invalid unit')
    })

    it('returns the correct unit for each valid input unit', () => {
        // Imperial units
        assert.equal(convertHandler.getUnit('lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('gal'), 'gal')
        assert.equal(convertHandler.getUnit('mi'), 'mi')

        // Metric units
        assert.equal(convertHandler.getUnit('kg'), 'kg')
        assert.equal(convertHandler.getUnit('l'), 'l')
        assert.equal(convertHandler.getUnit('km'), 'km')
    })

    it('correctly returns the spelled-out string unit for each valid input unit', () => {
        // Metric units
        assert.equal(convertHandler.spellOutUnit('l'), 'litres')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometres')

        // Imperial units
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    })
});