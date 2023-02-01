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
        assert.isNull(convertHandler.getNum('3/2/3'))
        assert.isNull(convertHandler.getNum('3/2/3km'))
        assert.isNull(convertHandler.getNum('3/2/3km'))
    })

    it('it defaults to a numerical input of `1` when no numerical input is provided', () => {
        assert.isNull(convertHandler.getNum(''))
        assert.isNumber(convertHandler.getNum('km'))
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
        assert.equal(convertHandler.getUnit('l'), 'L')
        assert.equal(convertHandler.getUnit('L'), 'L')
    })

    it('returns an error for an invalid input', () => {
        assert.isNull(convertHandler.getUnit(''))
        assert.isNull(convertHandler.getUnit('1'))
        assert.isNull(convertHandler.getUnit('potato'))
        assert.isNull(convertHandler.getUnit('ll'))
        assert.isNull(convertHandler.getUnit('kms'))
    })

    it('returns the correct unit for each valid input unit', () => {
        // Imperial units
        assert.equal(convertHandler.getUnit('lbs'), 'lbs')
        assert.equal(convertHandler.getUnit('gal'), 'gal')
        assert.equal(convertHandler.getUnit('mi'), 'mi')

        // Metric units
        assert.equal(convertHandler.getUnit('kg'), 'kg')
        assert.equal(convertHandler.getUnit('l'), 'L')
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

    it('returns the imperial/metric equivalent of the input unit', () => {
        // Metric to imperial
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        // Imperial to metric
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    })

    it('correctly converts metric to imperial values', () => {
        assert.equal(convertHandler.convert(1, 'L'), 0.26417)
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462)
        assert.equal(convertHandler.convert(1, 'km'), 0.62137)
    })

    it('correctly converts imperial to metric values', () => {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
    })
});