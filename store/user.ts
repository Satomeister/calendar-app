import { flow, Instance, types } from 'mobx-state-tree';

import axios from '../core/axios';

export const User = types.model('User', {
  id: types.number,
  name: types.string,
  photoUrl: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});

interface User extends Instance<typeof User> {}

const UserStore = types
  .model('UserStore', {
    user: types.maybe(User),
  })
  .actions((self) => {
    const me = flow(function* me() {
      const response = yield axios.get('/me');
      self.user = response.data.user;
    });

    const logout = function () {
      localStorage.removeItem('token');
      self.user = undefined;
    };

    return {
      me,
      logout,
    };
  })
  .views((self) => ({
    get isAuth(): boolean {
      return !!self.user;
    },
  }));

export default UserStore;
