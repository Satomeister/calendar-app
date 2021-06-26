import { types } from 'mobx-state-tree';
import { addMonths } from 'date-fns';

const CalendarStore = types
  .model('CalendarStore', {
    date: types.optional(types.Date, new Date()),
    month: types.optional(types.Date, new Date()),
  })
  .actions((self) => ({
    setDate(date: Date) {
      self.date = date;
    },
    changeMonth(month: number) {
      self.month = addMonths(self.month, month);
    },
    setCurrentMonth() {
      self.month = new Date();
    },
  }));

export default CalendarStore;
