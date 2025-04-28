export interface Course {
    id: number;
    name: string;
    level: string; 
    duration: number; 
    available: boolean; 
    modality: 'online' | 'presencial'; 
}
  