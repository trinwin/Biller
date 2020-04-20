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
      to: '/transactions',
    },
    {
      title: 'Forms & Components',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components-overview',
    },
    {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/errors',
    },
  ];
}
