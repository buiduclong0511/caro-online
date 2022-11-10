import { Routes, Route } from 'react-router-dom';

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
        </div>
    );
}

export default App;
