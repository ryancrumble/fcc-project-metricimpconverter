import {ImperialUnit, UnitKey, Unit, UnitFormatMap} from "../types/measurements.js";
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
        input = input.replace(',', '')

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
     * @return {UnitKey} The input unit
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

        let unit = rawUnit[0] as UnitKey

        if (!unitSet.has(unit)) {
            return null
        }

        return this.formatUnit(unit)
    }

    /**
     * @name getReturnUnit
     * @description Extracts the unit of measurement provided
     * @param initUnit {UnitKey} Initial unit of measurement
     * @return {UnitKey} Metric/imperial equivalent of unit of measurement
     */
    public getReturnUnit(initUnit: Unit): Unit | null {
        const _initUnit = initUnit.toLowerCase() as UnitKey

        for (let [imperial, metric] of unitMap.entries()) {
            if (_initUnit === imperial) {
                return this.formatUnit(metric)
            } else if (_initUnit === metric) {
                return this.formatUnit(imperial)
            }
        }

        return null
    }

    /**
     * @name spellOutUnit
     * @description Gets the word of the unit of measurement
     * @param unit {UnitKey} Unit in lowercase
     * @return {string | undefined} Word of measurement e.g. 'kilometers', 'litres'
     */
    public spellOutUnit(unit: UnitKey): string | undefined {
        return unitLongNameMap.get(unit)
    }

    /**
     * @name convert
     * @description Converts one value to its metric/imperial equivalent
     * @param initNum {number}  Initial value
     * @param initUnit {number} Initial unit measurement
     * @return returnNum {number} The converted number value
     */
    public convert(initNum: number, initUnit: Unit): number {
        const isImperial = unitMap.has(initUnit.toLowerCase() as ImperialUnit)
        const conversationRate = unitConversionRate.get(initUnit.toLowerCase() as UnitKey)

        if (!conversationRate) {
            throw Error('No conversation rate found for the provided unit')
        }

        if (isImperial) {
            return this.formatNumber(initNum * conversationRate)
        }

        return this.formatNumber(initNum / conversationRate)
    };


    /**
     * @name getString
     * @description Creates a human-readable sentence of the converted value
     * @param initNum {number}
     * @param initUnit {UnitKey}
     * @param returnNum {number}
     * @param returnUnit {UnitKey}
     * @return {string} Sentence of converted
     */
    public getString(initNum: number, initUnit: Unit, returnNum: number, returnUnit: Unit) {
        const initLongNameUnit = this.spellOutUnit(initUnit.toLowerCase() as UnitKey);
        const returnLongNameUnit = this.spellOutUnit(returnUnit.toLowerCase() as UnitKey);

        return `${initNum} ${initLongNameUnit} converts to ${returnNum} ${returnLongNameUnit}`;
    };


    private formatNumber(value: number): number {
        return parseFloat(value.toFixed(5))
    }

    private formatUnit(value: UnitKey): Unit {
        const formatted = UnitFormatMap.get(value)

        if (!formatted) {
            throw Error('Unit not found. Cannot format unit')
        }

        return formatted
    }

}

export default ConvertHandler;
