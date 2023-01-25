export type ImperialUnit = 'gal' | 'lbs' | 'mi'
export type MetricUnit = 'l' | 'kg' | 'km'

export type Unit = ImperialUnit | MetricUnit

export enum UnitEnum {
    GALLON = 'gal',
    LITRE = 'L',
    POUND = 'lbs',
    KILOGRAM = 'kg',
    MILES = 'mi',
    KILOMETRE = 'km'
}
