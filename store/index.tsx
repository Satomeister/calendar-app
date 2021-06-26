
import { types } from 'mobx-state-tree';
import UserStore from './user';
import CalendarStore from './calendar';

const RootStore = types.model('RootStore', {
  userStore: types.optional(UserStore, {}),
  calendarStore: types.optional(CalendarStore, {})
})

export default RootStore;