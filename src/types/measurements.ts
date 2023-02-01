export type ImperialUnit = 'gal' | 'lbs' | 'mi'
export type MetricUnit = 'l' | 'kg' | 'km'

export type UnitKey = ImperialUnit | MetricUnit

export type Unit = 'gal' | 'lbs' | 'mi' | 'L' | 'kg' | 'km'

export const UnitFormatMap: Map<UnitKey, Unit> = new Map([
    ['gal', 'gal'],
    ['l', 'L'],
    ['lbs', 'lbs'],
    ['kg', 'kg'],
    ['mi', 'mi'],
    ['km', 'km']
])