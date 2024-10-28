declare module 'react-chartjs-2' {
    import { ChartProps } from 'chart.js';
    
    export interface LineProps extends ChartProps {
      data: any;
      options?: any;
    }
  
    export const Line: React.FC<LineProps>;
  }