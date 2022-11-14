import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routes from '~/routes';

function App() {
    return (
        <div className="app">
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
