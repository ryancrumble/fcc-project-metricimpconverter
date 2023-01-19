import {Unit} from "../types/measurements.js";

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
    public getNum(input: string) {
        const split = input.split(/(\d+)/)

        const result = input.toLowerCase().replace(/[^a-z]/gi, '') || 1;

        return result;
    };

    /**
     * @name getUnit
     * @description Extracts the unit of measurement provided
     * @param input {string} Raw string input
     * @return {Unit} The input unit
     */
    public getUnit(input: any) {
        let result;

        return result;
    };

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
     * @param unit {Unit}
     * @return {string} Word of measurement e.g. 'kilometers', 'litres'
     */
    public spellOutUnit(unit: Unit) {
        let result;

        return result;
    };

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
