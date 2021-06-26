import { useContext } from 'react';
import { StoreContext } from '../pages/_document';

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;