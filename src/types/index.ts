export type WeatherType = 'Rainy' | 'Cloudy' | 'Sunny';
export type RiskLevel = 'High' | 'Medium' | 'Low' | 'None';

export interface Demographics {
    children: number;
    adults: number;
    seniors: number;
    pwd: number;
}

export interface Barangay {
    id: number;
    name: string;
    population: number;
    households: number;
    weather: WeatherType;
    precipProb: number;
    temp: number;
    riskLevel: RiskLevel;
    demographics: Demographics;
}

export interface Notification {
    id: number;
    msg: string;
    time: string;
    type: 'alert' | 'info' | 'success';
}
