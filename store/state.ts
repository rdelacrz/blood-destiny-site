import { AlertParam, Update } from '@/models';

/* Represents state of Vue Query data */
export interface VueQueryData {
  updates: Update[];
}

/* Represents state of the store. */

export interface RootState {
  popupParam: AlertParam | null;
  vueQueryData: VueQueryData;
}

export default RootState;
