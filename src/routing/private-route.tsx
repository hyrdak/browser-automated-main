import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from 'constants-es';

import NodeListingRoot from 'modules/nodes/pages/node-listing';
import WorkflowDetail from 'modules/work-flows/pages/work-flow-detail';
import WorkflowListingRoot from 'modules/work-flows/pages/work-flow-listing';
import PrivateLayout from 'components/layouts/private-layout';

const PrivateRoute = () => {
    return <Routes></Routes>;
};

export default PrivateRoute;
