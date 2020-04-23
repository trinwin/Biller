// Layout Types
import { DefaultLayout } from '../layouts';

// Route Views
import BillOverview from '../views/BillOverView/BillOverview';
import UserProfile from '../views/UserProfile';
import Errors from '../views/Errors';
import ComponentsOverview from '../views/ComponentsOverview';
import Transactions from '../views/Transactions';

export default [
  {
    path: '/dashboard',
    layout: DefaultLayout,
    component: BillOverview,
  },
  {
    path: '/user-profile',
    layout: DefaultLayout,
    component: UserProfile,
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
    path: '/transactions',
    layout: DefaultLayout,
    component: Transactions,
  },
  {
    path: '/transactionsEach/:accountName',
    layout: DefaultLayout,
    component: Transactions,
  },
];
