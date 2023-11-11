export interface AlertParam {
  isActive: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'question';
}