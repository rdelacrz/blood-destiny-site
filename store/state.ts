import { AlertParam } from '@/models';
import { AudioModuleState, CharactersModuleState, ContactsModuleState, UpdatesModuleState } from './modules';

/* Represents state of the store. */

export interface RootState {
  popupParam: AlertParam | null;
}

export default RootState;
