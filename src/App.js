import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RoomMiddleware } from '~/components';
import { ListenDbFirebase } from '~/modules';
import routes from '~/routes';

function App() {
    return (
        <div className="app">
            <ListenDbFirebase />
            <Routes>
                {routes.map((route, index) => {
                    const Element = route.element;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <RoomMiddleware>
                                    <Element />
                                </RoomMiddleware>
                            }
                        />
                    );
                })}
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
