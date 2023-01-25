import {Unit, ImperialUnit, MetricUnit} from "../types/measurements.js";

export const unitSet = new Set<Unit>(['gal', 'l', 'lbs', 'kg', 'mi', 'km'])
export const unitMap = new Map<ImperialUnit, MetricUnit>([ ['gal', 'l'], ['lbs', 'kg'], ['mi', 'km'] ])

