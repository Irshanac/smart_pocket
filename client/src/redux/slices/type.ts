export interface JobCount {
    _id: string; 
    count: number; 
  }
  
  export interface JobState {
    jobCounts: { _id: string; count: number }[];
    loading: boolean;
    error: string | null;
    providerCounts:[]
  }
  
export interface provierCount {
  name:string,
  description:string
}