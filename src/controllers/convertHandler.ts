import {ImperialUnit, Unit} from "../types/measurements.js";
import {ConvertError} from "../types/convert.js";
import {unitConversionRate, unitLongNameMap, unitMap, unitSet} from "../constants/measurements.js";

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
    public getNum(input: string): number | null {
        if (!input) {
            return null
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
                return null
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
    public getUnit(input: string): Unit | null {
        // No value provided
        if (!input) {
            return null
        }

        const rawUnit = input.toLowerCase().match(/[A-Za-z]+/gi)

        // No unit provided
        if (!rawUnit) {
            return null
        }

        const unit = rawUnit[0].toLowerCase() as Unit

        if (!unitSet.has(unit)) {
            return null
        }

        return unit
    }

    /**
     * @name getReturnUnit
     * @description Extracts the unit of measurement provided
     * @param initUnit {Unit} Initial unit of measurement
     * @return {Unit} Metric/imperial equivalent of unit of measurement
     */
    public getReturnUnit(initUnit: Unit): Unit | null {
        for (let [imperial, metric] of unitMap.entries()) {
            if (initUnit === imperial) {
                return metric
            } else if (initUnit === metric) {
                return imperial
            }
        }

        return null
    }

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
     * @description Converts one value to its metric/imperial equivalent
     * @param initNum {number}  Initial value
     * @param initUnit {number} Initial unit measurement
     * @return returnNum {number} The converted number value
     */
    public convert(initNum: number, initUnit: Unit) {
        const isImperial = unitMap.has(initUnit as ImperialUnit)
        const conversationRate = unitConversionRate.get(initUnit)

        if (!conversationRate) {
            throw Error('No conversation rate found for the provided unit')
        }

        if (isImperial) {
            return initNum * conversationRate
        }

        return initNum / conversationRate
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
