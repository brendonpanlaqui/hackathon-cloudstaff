import type { Barangay } from '../types';

export const INITIAL_DATA: Barangay[] = [
    {
        name: 'Tabun',
        population: 8000,
        lat: 0,
        lon: 0,
        weather: 'Cloudy',
        precipProb: 15,
        temp: 31,
        riskLevel: 'High',
        demographics: { children: 2800, seniors: 800, pwd: 80 },
        percentage: 90
    }
];
