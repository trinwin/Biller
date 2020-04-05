// Layout Types
import { DefaultLayout } from '../layouts';

// Route Views
import BillOverview from '../views/BillOverview';
import UserProfileLite from '../views/UserProfileLite';
import Errors from '../views/Errors';
import ComponentsOverview from '../views/ComponentsOverview';
import Tables from '../views/Tables';

export default [
  {
    path: '/dashboard',
    layout: DefaultLayout,
    component: BillOverview,
  },
  {
    path: '/user-profile',
    layout: DefaultLayout,
    component: UserProfileLite,
  },
  {
    path: '/errors',
    layout: DefaultLayout,
    component: Errors,
  },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
  },
  {
    path: '/tables',
    layout: DefaultLayout,
    component: Tables,
  },
];
