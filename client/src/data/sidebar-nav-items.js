export default function() {
  return [
    {
      title: 'Overview',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: '',
    },
    {
      title: 'Transactions',
      htmlBefore: '<i class="material-icons">attach_money</i>',
      to: '/transactions/:accountName',
    },
    {
      title: 'Add an Account',
      htmlBefore: '<i class="material-icons">add</i>',
      to: '/setup',
    },
  ];
}
