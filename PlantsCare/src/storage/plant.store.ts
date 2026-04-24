export type Plant = {
    name: string; 
    description: string;
    lighting: string;
    watering: string;
    temperature: string;
    transplanting: string;
  };
  
  export const PlantStore = new Map<string, Plant>();