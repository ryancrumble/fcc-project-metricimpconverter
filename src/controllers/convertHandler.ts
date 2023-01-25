import {Unit} from "../types/measurements.js";
import {ConvertError} from "../types/convert.js";
import {unitLongNameMap, unitSet} from "../constants/measurements.js";

/**
 * @name ConvertHandler
 * @description Convert units of measurement
 */
class ConvertHandler {
    constructor() {
    }

    /**
     * @name getNum
     * @description Extracts the number value provided
     * @param input {string} Raw string input
     * @return {number} The input number
     */
    public getNum(input: string): number | ConvertError {
        if (!input) {
            return 'Invalid number'
        }

        // Remove commas
        input.replace(',', '')

        // Validate fractional number
        if (input.indexOf('/') !== -1) {
            let count = 0;

            for (const char of input) {
                if (char === '/') {
                    count++
                }
            }

            // Return if invalid fraction
            if (count > 1) {
                return 'Invalid number'
            }
        }

        const value = input.match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)?.toString() || '1'

        // Handle fractions
        if (value.indexOf(',') !== -1) {
            const [numerator, denominator] = value.split(',')

            return parseFloat(numerator) / parseInt(denominator)
        }

        return parseFloat(value)
    };

    /**
     * @name getUnit
     * @description Extracts the unit of measurement provided
     * @param input {string} Raw string input
     * @return {Unit} The input unit
     */
    public getUnit(input: string): Unit | ConvertError {
        // No value provided
        if (!input) {
            return 'Invalid unit'
        }

        const rawUnit = input.toLowerCase().match(/[A-Za-z]+/gi)

        // No unit provided
        if (!rawUnit) {
            return 'Invalid unit'
        }

        const unit = rawUnit[0].toLowerCase() as Unit

        if (!unitSet.has(unit)) {
            return 'Invalid unit'
        }

        return unit
    }

    /**
     * @name getReturnUnit
     * @description Extracts the unit of measurement provided
     * @param initUnit {Unit} Initial unit of measurement
     * @return {Unit} Metric/imperial equivalent of unit of measurement
     */
    public getReturnUnit(initUnit: Unit) {
        let result;

        return result;
    };

    /**
     * @name spellOutUnit
     * @description Gets the word of the unit of measurement
     * @param unit {Unit} Unit in lowercase
     * @return {string | undefined} Word of measurement e.g. 'kilometers', 'litres'
     */
    public spellOutUnit(unit: Unit): string | undefined {
        return unitLongNameMap.get(unit)
    }

    /**
     * @name convert
     * @description Converts one value to it's metric/imperial equivalent
     * @param initNum {number}  Initial value
     * @param initUnit {number} Initial unit measurement
     */
    public convert(initNum: number, initUnit: Unit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        let result;

        return result;
    };

    /**
     * @name getString
     * @description Creates a human-readable sentence of the converted value
     * @param initNum {number}
     * @param initUnit {Unit}
     * @param returnNum {number}
     * @param returnUnit {Unit}
     * @return {string} Sentence of converted
     */
    public getString(initNum: number, initUnit: Unit, returnNum: number, returnUnit: Unit) {
        let result;

        return result;
    };

}

export default ConvertHandler;
