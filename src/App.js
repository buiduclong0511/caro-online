import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ListenDbFirebase } from '~/modules';
import routes from '~/routes';

function App() {
    const state = useSelector((state) => {
        return state;
    });
    console.log('state', state);
    return (
        <div className="app">
            <ListenDbFirebase />
            <Routes>
                {routes.map((route, index) => {
                    const Element = route.element;
                    return <Route key={index} path={route.path} element={<Element />} />;
                })}
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
