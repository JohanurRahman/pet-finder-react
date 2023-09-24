import React from 'react';
import { createRoot } from 'react-dom';
import Pet from './Pet';

const App = () => {
          return (
                    <div>
                              <h1>Adobe Me!</h1>
                              <Pet
                                        animal={'Dog'}
                                        name={'Luna'}
                                        breed={'Havanese'}
                              />
                    </div>
          );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
