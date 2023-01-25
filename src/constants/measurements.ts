import {Unit, ImperialUnit, MetricUnit} from "../types/measurements.js";

export const unitSet = new Set<Unit>(['gal', 'l', 'lbs', 'kg', 'mi', 'km'])
export const unitMap = new Map<ImperialUnit, MetricUnit>([ ['gal', 'l'], ['lbs', 'kg'], ['mi', 'km'] ])

export const unitLongNameMap = new Map<Unit, string>([
    ['l', 'litres'],
    ['kg', 'kilograms'],
    ['km', 'kilometres'],
    ['gal', 'gallons'],
    ['lbs', 'pounds'],
    ['mi', 'miles']
]);

