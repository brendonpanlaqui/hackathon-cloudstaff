export interface Demographics {
    children: number;
    seniors: number;
    pwd: number;
}

export interface Barangay {
    name: string;
    population: number;
    weather: string;
    precipProb: number;
    temp: number;
    riskLevel: string;
    demographics: Demographics;
    lat: number;
    lon: number;
    percentage: number
}

export interface Notification {
    id: number;
    msg: string;
    time: string;
    type: 'alert' | 'info' | 'success';
}

export interface DifyResponse {
    event: string;
    task_id: string;
    id: string;
    message_id: string;
    conversation_id: string;
    mode: string;
    answer: string;
    created_at: Date;
}
export interface IAnswer {
    flood_risk: string;
    rain_forecast: string
    flooded_barangays: Ibarangay[];
    typhoon_status: string
    typhoon_strength: number
    temperature_2m: number,
    precipitation: number,
    weather_code: number 
}
export interface Ibarangay {
    name: string;
    lat?: number;
    lon?: number;
    children: number;
    pwd: number;
    senior: number;
    total_population: number
    flood_risk: string
}
export interface FloodedBarangayWithCoords {
    name: string;
    lat: number;
    lon: number;
    total_population: number;
    children: number;
    senior: number;
    flood_risk: string
}


export interface DifyPayload {
    inputs: object;
    query: string;
    response_mode: string;
    conversation_id?: string;
    user: string;
}
