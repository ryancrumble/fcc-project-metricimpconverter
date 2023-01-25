import {Unit, ImperialUnit, MetricUnit} from "../types/measurements.js";

export const unitSet = new Set<Unit>(['gal', 'l', 'lbs', 'kg', 'mi', 'km'])
export const unitMap = new Map<ImperialUnit, MetricUnit>([['gal', 'l'], ['lbs', 'kg'], ['mi', 'km']])

export const galToL = 3.78541;
export const lbsToKg = 1.609342;
export const miToKm = 1.60934;

export const unitLongNameMap = new Map<Unit, string>([
    ['l', 'litres'],
    ['kg', 'kilograms'],
    ['km', 'kilometres'],
    ['gal', 'gallons'],
    ['lbs', 'pounds'],
    ['mi', 'miles']
]);

export const unitConversionRate = new Map<Unit, number>([
    ['l', galToL],
    ['kg', lbsToKg],
    ['km', miToKm],
    ['gal', galToL],
    ['lbs', lbsToKg],
    ['mi', miToKm]
])