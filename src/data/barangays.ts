import type { Barangay } from '../types';

export const INITIAL_DATA: Barangay[] = [
    {
        id: 1,
        name: 'Balibago',
        population: 42500,
        households: 10200,
        weather: 'Rainy',
        precipProb: 85,
        temp: 28,
        riskLevel: 'High',
        demographics: { children: 14875, adults: 23375, seniors: 4250, pwd: 425 } // Approx 35% / 55% / 10%
    },
    {
        id: 2,
        name: 'Cutcut',
        population: 29000,
        households: 6800,
        weather: 'Cloudy',
        precipProb: 20,
        temp: 30,
        riskLevel: 'Low',
        demographics: { children: 8700, adults: 17400, seniors: 2900, pwd: 290 }
    },
    {
        id: 3,
        name: 'Pulung Maragul',
        population: 18500,
        households: 4100,
        weather: 'Rainy',
        precipProb: 90,
        temp: 27,
        riskLevel: 'High',
        demographics: { children: 6475, adults: 10175, seniors: 1850, pwd: 185 }
    },
    {
        id: 4,
        name: 'Santo Rosario',
        population: 12000,
        households: 3000,
        weather: 'Sunny',
        precipProb: 5,
        temp: 33,
        riskLevel: 'None',
        demographics: { children: 3000, adults: 7200, seniors: 1800, pwd: 120 }
    },
    {
        id: 5,
        name: 'Sapang Bato',
        population: 15200,
        households: 3500,
        weather: 'Rainy',
        precipProb: 75,
        temp: 26,
        riskLevel: 'Medium',
        demographics: { children: 5320, adults: 8360, seniors: 1520, pwd: 152 }
    },
    {
        id: 6,
        name: 'Pandan',
        population: 21000,
        households: 4800,
        weather: 'Cloudy',
        precipProb: 30,
        temp: 29,
        riskLevel: 'Low',
        demographics: { children: 7350, adults: 11550, seniors: 2100, pwd: 210 }
    },
    {
        id: 7,
        name: 'Anunas',
        population: 24500,
        households: 5600,
        weather: 'Sunny',
        precipProb: 10,
        temp: 32,
        riskLevel: 'None',
        demographics: { children: 8575, adults: 13475, seniors: 2450, pwd: 245 }
    },
    {
        id: 8,
        name: 'Malabanias',
        population: 28000,
        households: 6200,
        weather: 'Rainy',
        precipProb: 80,
        temp: 28,
        riskLevel: 'High',
        demographics: { children: 9800, adults: 15400, seniors: 2800, pwd: 280 }
    },
    {
        id: 9,
        name: 'Margot',
        population: 9500,
        households: 2100,
        weather: 'Sunny',
        precipProb: 0,
        temp: 34,
        riskLevel: 'None',
        demographics: { children: 3325, adults: 5225, seniors: 950, pwd: 95 }
    },
    {
        id: 10,
        name: 'Tabun',
        population: 8000,
        households: 1800,
        weather: 'Cloudy',
        precipProb: 15,
        temp: 31,
        riskLevel: 'Low',
        demographics: { children: 2800, adults: 4400, seniors: 800, pwd: 80 }
    },
];
