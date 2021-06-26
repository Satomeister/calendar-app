import Document, { Html, Head, Main, NextScript } from 'next/document';
import { createContext } from 'react';

import RootStore from '../store';

const store = RootStore.create({});

export const StoreContext = createContext(store);

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head title={'Calendar'} />
        <body>
          <StoreContext.Provider value={store}>
            <Main />
          </StoreContext.Provider>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
