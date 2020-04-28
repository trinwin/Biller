import React from 'react';

export const page1 = [
  {
    title: 'Store of all your bills',
    content:
      'Through connecting your bank accounts with Plaid, Biller can gather and display all of your banking information.',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/MmROsqZndrFBrIspzLlL.png',
  },
  {
    title: 'Manage your expenses',
    content:
      'Biller contains various analytical tools to help you manage your finances across all of your connected bank accounts.',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/ONvKhpRAmkCfdEhkUZkJ.png',
  },
  {
    title: 'Help you save money',
    content:
      'Biller notifies you of any incomming due dates for your bills. Never forget that one obscure subscription ever again!',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/oxmXLgGjCeXfYPcVSbKg.png',
  },
];

export const page2 = [
  {
    title: 'Free',
    content: [
      <p key="1">Feature List</p>,
      <p key="2">Connect and view your bank accounts</p>,
      <p key="3">View the last 6 months of your bills</p>,
      <p key="4">Set up notifications on monthly bills</p>,
    ],

    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <defs>
          <linearGradient
            x1="50%"
            y1="0%"
            x2="50%"
            y2="98.8500478%"
            id="linearGradient-1"
          >
            <stop stopColor="#FFD24C" offset="0%" />
            <stop stopColor="#FFB800" offset="100%" />
          </linearGradient>
        </defs>
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
           C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
              L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
              L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
              C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
              L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
              L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
              C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
              L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="#D9D9D9"
        />
        <path
          d="M11.2,19.9763991 L1.43301577,25.9589289
        C0.542750835,26.5042392 1.20441457e-15,27.4731633 1.33226763e-15,28.5171628
              L0,28.5171628 L0,30 C1.3527075e-16,31.1045695 0.8954305,32 2,32
              L30,32 C31.1045695,32 32,31.1045695 32,30 L32,30 L32,28.5391533
              C32,27.4832633 31.4449138,26.5051178 30.53843,25.9636469 L30.53843,25.9636469
              L20.8,20.1465799 L20.8,18.1051172 C22.2729985,16.7867478 23.2,14.8708611 23.2,12.7384615
              L23.2,7.2 C23.2,3.2235498 19.9764502,-7.30462051e-16 16,0
              C12.0235498,7.30462051e-16 8.8,3.2235498 8.8,7.2 L8.8,7.2
              L8.8,12.7384615 C8.8,14.8708611 9.72700154,16.7867478 11.2,18.1051172 L11.2,19.9763991 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Basic',
    content: [
      <p key="1">Feature List</p>,
      <p key="2">All the features from the free model</p>,
      <p key="3">Connect to your utility accounts</p>,
      <p key="4">View projections on your expenses</p>,
      <p key="5">Set up custom notifications</p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
          L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
        L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
        C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
        C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
        Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
        L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
        L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
        Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="#D9D9D9"
        />
        <path
          d="M22.3555358,32 L9.93657149,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
          L0,18 C-1.3527075e-16,16.8954305 0.8954305,16 2,16 L2,16 L6.78535432,16 L6.78535432,2
        L6.78535432,2 C6.78535432,0.8954305 7.68078482,2.02906125e-16 8.78535432,0 L21.7853543,0
        C22.8899238,-2.02906125e-16 23.7853543,0.8954305 23.7853543,2 L23.7853543,7 L30,7
        C31.1045695,7 32,7.8954305 32,9 L32,30 C32,31.1045695 31.1045695,32 30,32 L22.3555358,32
        Z M10,4 L10,8 L14,8 L14,4 L10,4 Z M10,12 L10,16 L14,16 L14,12 L10,12 Z M10,20 L10,24 L14,24
        L14,20 L10,20 Z M3,20 L3,24 L7,24 L7,20 L3,20 Z M17,4 L17,8 L21,8 L21,4 L17,4 Z M17,12 L17,16
        L21,16 L21,12 L17,12 Z M17,20 L17,24 L21,24 L21,20 L17,20 Z M24,20 L24,24 L28,24 L28,20 L24,20
        Z M24,12 L24,16 L28,16 L28,12 L24,12 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
  {
    title: 'Plus',
    content: [
      <p key="1">Feature List</p>,
      <p key="2">All the features from the plus model</p>,
      <p key="3">
        Allow for up to 2 other people to have their own seperate accounts under
        you
      </p>,
      <p key="4">
        Compare or combine each others' data (with their permission)
      </p>,
    ],
    svg: (
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          d="M21.1504124,8.82079742 L16.5552541,3.32558694
          C16.5324137,3.29827282 16.5071873,3.27304601 16.4798736,3.25020514
        C16.2256714,3.03763068 15.8472742,3.07137659 15.6346998,3.32557875
        L15.6346998,3.32557875 L10.966694,8.90770327 L8.07603504,6.76607715
        L8.07603504,6.76607715 C7.80977712,6.56881247 7.43401779,6.62474254 7.23675311,6.89100046
        C7.13505771,7.02826378 7.09669461,7.20236809 7.13128245,7.36966081 L8.29535756,13
        L15.9998162,13 L23.7045714,13 L24.8686535,7.36962696
        C24.9357456,7.0451192 24.727069,6.72766477 24.4025612,6.66057265
        C24.2352715,6.62598542 24.0611703,6.66434651 23.9239079,6.76603807
        L21.1504124,8.82079742 Z M2,14 L30,14 C31.1045695,14 32,14.8954305 32,16
        L32,30 C32,31.1045695 31.1045695,32 30,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
        L0,16 C-1.3527075e-16,14.8954305 0.8954305,14 2,14 L2,14 Z M16,2 C15.4477153,2 15,1.55228475 15,1
        C15,0.44771525 15.4477153,0 16,0 C16.5522847,0 17,0.44771525 17,1 C17,1.55228475 16.5522847,2 16,2 Z
        M6,6 C5.44771525,6 5,5.55228475 5,5 C5,4.44771525 5.44771525,4 6,4 C6.55228475,4 7,4.44771525 7,5
        C7,5.55228475 6.55228475,6 6,6 Z M26,6 C25.4477153,6 25,5.55228475 25,5
        C25,4.44771525 25.4477153,4 26,4 C26.5522847,4 27,4.44771525 27,5
        C27,5.55228475 26.5522847,6 26,6 Z M14.0979687,19.25
        C14.1648524,19.04375 14.177013,18.94375 14.1526917,18.825
        C14.1101294,18.6375 13.9094785,18.5 13.7149079,18.5
        C13.6237029,18.5 13.5264176,18.53125 13.459534,18.59375
        C13.368329,18.675 13.3257667,18.75625 13.2588831,18.9625 L11.0821247,25.80625
        L8.90536631,18.9625 C8.83848268,18.75625 8.79592036,18.675 8.7047154,18.59375
        C8.63783176,18.53125 8.54054647,18.5 8.44934151,18.5
        C8.25477093,18.5 8.05412002,18.6375 8.0115577,18.825
        C7.98723638,18.94375 7.99939704,19.04375 8.06628068,19.25 L10.5713769,26.98125
        C10.6260999,27.15625 10.6929835,27.3 10.7659475,27.36875
        C10.8632328,27.46875 10.9544378,27.5 11.0821247,27.5
        C11.2037313,27.5 11.2949363,27.46875 11.3983019,27.36875
        C11.4712659,27.3 11.5381495,27.15625 11.5928725,26.98125
        L14.0979687,19.25 Z M16.5726622,19.15 C16.5726622,18.9 16.5605016,18.81875 16.4875376,18.7
        C16.4145736,18.58125 16.274726,18.5 16.1044768,18.5 C15.9342275,18.5 15.7943799,18.58125 15.7214159,18.7
        C15.648452,18.81875 15.6362913,18.9 15.6362913,19.15 L15.6362913,26.85
        C15.6362913,27.1 15.648452,27.18125 15.7214159,27.3 C15.7943799,27.41875 15.9342275,27.5 16.1044768,27.5
        C16.274726,27.5 16.4145736,27.41875 16.4875376,27.3 C16.5605016,27.18125 16.5726622,27.1 16.5726622,26.85
        L16.5726622,19.15 Z M19.0777579,19.13125 L19.0777579,26.85
        C19.0777579,27.1 19.0899186,27.18125 19.1628825,27.3
        C19.2358465,27.41875 19.3756941,27.5 19.5459434,27.5
        C19.7161926,27.5 19.8560402,27.41875 19.9290042,27.3
        C20.0019682,27.18125 20.0141288,27.1 20.0141288,26.85
        L20.0141288,23.7875 L22.3124938,23.7875 C23.8872995,23.7875 25,22.75 25,21.1625
        C25,19.575 23.8872995,18.55 22.3124938,18.55 L19.6432287,18.55
        C19.4973007,18.55 19.3331318,18.55 19.2054449,18.68125
        C19.0777579,18.8125 19.0777579,18.98125 19.0777579,19.13125 Z M22.2395299,19.4
        C23.3218287,19.4 24.0575487,19.9875 24.0575487,21.1625
        C24.0575487,22.3375 23.3218287,22.9375 22.2395299,22.9375 L20.0141288,22.9375
        L20.0141288,19.4 L22.2395299,19.4 Z"
          fill="#D9D9D9"
        />
        <path
          d="M21.1504124,8.82079742 L16.5552541,3.32558694
          C16.5324137,3.29827282 16.5071873,3.27304601 16.4798736,3.25020514
        C16.2256714,3.03763068 15.8472742,3.07137659 15.6346998,3.32557875
        L15.6346998,3.32557875 L10.966694,8.90770327 L8.07603504,6.76607715
        L8.07603504,6.76607715 C7.80977712,6.56881247 7.43401779,6.62474254 7.23675311,6.89100046
        C7.13505771,7.02826378 7.09669461,7.20236809 7.13128245,7.36966081 L8.29535756,13
        L15.9998162,13 L23.7045714,13 L24.8686535,7.36962696
        C24.9357456,7.0451192 24.727069,6.72766477 24.4025612,6.66057265
        C24.2352715,6.62598542 24.0611703,6.66434651 23.9239079,6.76603807
        L21.1504124,8.82079742 Z M2,14 L30,14 C31.1045695,14 32,14.8954305 32,16
        L32,30 C32,31.1045695 31.1045695,32 30,32 L2,32 C0.8954305,32 1.3527075e-16,31.1045695 0,30
        L0,16 C-1.3527075e-16,14.8954305 0.8954305,14 2,14 L2,14 Z M16,2 C15.4477153,2 15,1.55228475 15,1
        C15,0.44771525 15.4477153,0 16,0 C16.5522847,0 17,0.44771525 17,1 C17,1.55228475 16.5522847,2 16,2 Z
        M6,6 C5.44771525,6 5,5.55228475 5,5 C5,4.44771525 5.44771525,4 6,4 C6.55228475,4 7,4.44771525 7,5
        C7,5.55228475 6.55228475,6 6,6 Z M26,6 C25.4477153,6 25,5.55228475 25,5
        C25,4.44771525 25.4477153,4 26,4 C26.5522847,4 27,4.44771525 27,5
        C27,5.55228475 26.5522847,6 26,6 Z M14.0979687,19.25
        C14.1648524,19.04375 14.177013,18.94375 14.1526917,18.825
        C14.1101294,18.6375 13.9094785,18.5 13.7149079,18.5
        C13.6237029,18.5 13.5264176,18.53125 13.459534,18.59375
        C13.368329,18.675 13.3257667,18.75625 13.2588831,18.9625 L11.0821247,25.80625
        L8.90536631,18.9625 C8.83848268,18.75625 8.79592036,18.675 8.7047154,18.59375
        C8.63783176,18.53125 8.54054647,18.5 8.44934151,18.5
        C8.25477093,18.5 8.05412002,18.6375 8.0115577,18.825
        C7.98723638,18.94375 7.99939704,19.04375 8.06628068,19.25 L10.5713769,26.98125
        C10.6260999,27.15625 10.6929835,27.3 10.7659475,27.36875
        C10.8632328,27.46875 10.9544378,27.5 11.0821247,27.5
        C11.2037313,27.5 11.2949363,27.46875 11.3983019,27.36875
        C11.4712659,27.3 11.5381495,27.15625 11.5928725,26.98125
        L14.0979687,19.25 Z M16.5726622,19.15 C16.5726622,18.9 16.5605016,18.81875 16.4875376,18.7
        C16.4145736,18.58125 16.274726,18.5 16.1044768,18.5 C15.9342275,18.5 15.7943799,18.58125 15.7214159,18.7
        C15.648452,18.81875 15.6362913,18.9 15.6362913,19.15 L15.6362913,26.85
        C15.6362913,27.1 15.648452,27.18125 15.7214159,27.3 C15.7943799,27.41875 15.9342275,27.5 16.1044768,27.5
        C16.274726,27.5 16.4145736,27.41875 16.4875376,27.3 C16.5605016,27.18125 16.5726622,27.1 16.5726622,26.85
        L16.5726622,19.15 Z M19.0777579,19.13125 L19.0777579,26.85
        C19.0777579,27.1 19.0899186,27.18125 19.1628825,27.3
        C19.2358465,27.41875 19.3756941,27.5 19.5459434,27.5
        C19.7161926,27.5 19.8560402,27.41875 19.9290042,27.3
        C20.0019682,27.18125 20.0141288,27.1 20.0141288,26.85
        L20.0141288,23.7875 L22.3124938,23.7875 C23.8872995,23.7875 25,22.75 25,21.1625
        C25,19.575 23.8872995,18.55 22.3124938,18.55 L19.6432287,18.55
        C19.4973007,18.55 19.3331318,18.55 19.2054449,18.68125
        C19.0777579,18.8125 19.0777579,18.98125 19.0777579,19.13125 Z M22.2395299,19.4
        C23.3218287,19.4 24.0575487,19.9875 24.0575487,21.1625
        C24.0575487,22.3375 23.3218287,22.9375 22.2395299,22.9375 L20.0141288,22.9375
        L20.0141288,19.4 L22.2395299,19.4 Z"
          fill="url(#linearGradient-1)"
          className="icon-hover"
        />
      </svg>
    ),
  },
];

export const page3 = [
  {
    title: 'Trinh Nguyen',
    content: 'Project Manager',
    src:
      'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
  },
  {
    title: 'Au Tran',
    content: 'Backend Developer',
    src:
      'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png',
  },
  {
    title: 'Matthew Vu',
    content: 'Frontend Developer',
    src: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png',
  },
];

export const footer = [
  {
    text: 'About Us',
    content: (
      <div>
        <p class="c1">
          <span class="c2">Project: Biller</span>
        </p>
        <p class="c1">
          <span class="c5">Problem Statement</span>
        </p>
        <p class="c1 c8">
          <span class="c4">
            In this day and age, it is impractical to balance your checkbook as
            all of your money as well as expenses can be handled online.
            However, money and expenses are spread out in multiple accounts
            linked to different institutions such that money management becomes
            a series of cumbersome tasks such as reconciling multiple
            bank/credit card statements and tracking your debt across multiple
            cards for example. We are interested in doing a web application to
            help us conveniently monitor and control financial status and
            monthly spending.{' '}
          </span>
        </p>
        <p class="c1 c11">
          <span class="c3"></span>
        </p>
        <p class="c1">
          <span class="c5">Background and Motivation</span>
        </p>
        <p class="c1 c8">
          <span class="c4">Our team</span>
          <span class="c4">
            &nbsp;wants to proceed with this idea because we feel that this
            project is{' '}
          </span>
          <span class="c4 c8 c16">achievable</span>
          <span class="c2">
            &nbsp;within the semester while also being complex enough that we
            can split the development into roles. We believe that users would be
            interested in using this web application since it will not only be
            convenient, time-saving, but also encourage the users to practice
            better money management habits. Any expenses handled online ranging
            from common household bills (PG&amp;E, Xfinity), credit cards from
            various institutions (Chase, Discover), subscriptions
            (Amazon/Netflix/Youtube), or services (Uber) can be linked to this
            application. The app will essentially provide a platform to
            centralize all of the user&rsquo;s bank accounts, monthly bill
            payments across multiple accounts, and credit card expenses for
            monitoring as well as notifying the user of impending bills due date
            so that users can avoid late fee or interest fee. We also have plans
            to add features that relate to spending habits to help the user plan
            how they spend their money.
          </span>
        </p>
        <p class="c1 c11 c8">
          <span class="c6 c4"></span>
        </p>
        <p class="c1">
          <span class="c5">Goal</span>
        </p>
        <p class="c1">
          <span class="c2">
            Our goal for the project is to develop a web application that allows
            the user to concentrate their financial information in one location
            for ease of access.{' '}
          </span>
        </p>
        <p class="c1">
          <span class="c2">
            During the 3 month period developing this project we will
            accomplish:
          </span>
        </p>
        <ul class="c9 lst-kix_z3pfsnlff9jw-0 start">
          <li class="c0">
            <span class="c2">
              Application allowing users to link their various accounts to the
              application so the application can extract relevant information
              for display to users.{' '}
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              Simple, responsive flow to the UI allowing users to easily
              navigate.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              Provide safety measures to secure users&rsquo; personal
              information
            </span>
          </li>
        </ul>
        <p class="c1 c11">
          <span class="c3"></span>
        </p>
        <p class="c1">
          <span class="c5">Scope</span>
        </p>
        <p class="c1 c14">
          <span class="c2">In scope</span>
        </p>
        <ul class="c9 lst-kix_i166n8yrxuwa-0 start">
          <li class="c1 c10">
            <span class="c2">
              Front-end design with React (Ant Design library)
            </span>
          </li>
          <li class="c1 c10">
            <span class="c2">Cloud Database (Amazon RDS, MySQL)</span>
          </li>
          <li class="c1 c10">
            <span class="c2">Backend (Django, Python)</span>
          </li>
          <li class="c1 c10">
            <span class="c2">
              Landing page, login/register, dashboard, setup page
            </span>
          </li>
          <li class="c1 c10">
            <span class="c2">Hosting (Amazon AWS)</span>
          </li>
        </ul>
        <p class="c1 c14">
          <span class="c2">Out of scope</span>
        </p>
        <ul class="c9 lst-kix_65gjy437av5i-0 start">
          <li class="c1 c10">
            <span class="c2">Email notifications to user</span>
          </li>
          <li class="c1 c10">
            <span class="c2">Design a user-friendly UI</span>
          </li>
          <li class="c1 c10">
            <span class="c2">
              Organizes the billing information nicely for users to manage
            </span>
          </li>
        </ul>
        <p class="c1">
          <span class="c5">Deliverables</span>
        </p>
        <p class="c1">
          <span class="c2">We plan to deliver these features </span>
        </p>
        <ul class="c9 lst-kix_b6zfa2ty73h3-0 start">
          <li class="c0">
            <span class="c2">To see their bill history records</span>
          </li>
        </ul>
        <ul class="c9 lst-kix_wcixg5ignizp-0 start">
          <li class="c0">
            <span class="c2">
              To be able to link different accounts to the application
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              To be able to view information from different accounts in the
              dashboard
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              To be notified with email of future bill payment due dates
            </span>
          </li>
        </ul>
        <p class="c1 c11">
          <span class="c6 c4"></span>
        </p>
        <p class="c1">
          <span class="c5">Risks and Rewards</span>
        </p>
        <p class="c1">
          <span class="c2">What are the main risks of this project?</span>
        </p>
        <ul class="c9 lst-kix_f4go9x3tihsf-0 start">
          <li class="c0">
            <span class="c2">
              The team is overall still getting familiar with the use of the
              technology in the application. Though our team is familiar with
              some of the technologies in this project, we still need to learn
              all of the technologies in this project to deliver our application
              successfully.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              Due to the team&rsquo;s unfamiliarity of front-end development,
              the application may look simplistic. Our team plans to allocate
              more work to develop the application&rsquo;s interface to look
              more well designed.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              The amount of time alloted for this project is short. The amount
              of sprints we can do are limited. As such, our scope for the
              project reflects our assessment of the amount of work we can do
              within the given time period.
            </span>
          </li>
        </ul>
        <p class="c1">
          <span class="c2">
            What are the main rewards if this project succeeds?
          </span>
        </p>
        <ul class="c9 lst-kix_6rtlivk51yqw-0 start">
          <li class="c0">
            <span class="c2">
              The main reward is a successful deployment of a 3-tier
              architecture application developed using agile methodology,{' '}
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              In addition, we will have knowledge of new technologies we can
              apply for other projects.
            </span>
          </li>
        </ul>
        <p class="c1 c11">
          <span class="c4 c6"></span>
        </p>
        <p class="c1">
          <span class="c5">User Stories</span>
        </p>
        <ol class="c9 lst-kix_199miuui8dyu-0 start" start="1">
          <li class="c0">
            <span class="c2">
              As a user, I want to be able to register, login and logout.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              As a user, I want to be able to see all third-party accounts with
              most recent bills and their due date on user dashboard after I
              logged in.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              As a user, I want to login and connect to Chase account.{' '}
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              As a user, I want to see my credit card bill, its due date and
              minimum payment.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              As a user, I want to login and connect to an electricity and gas
              service online account.
            </span>
          </li>
          <li class="c0">
            <span class="c2">
              As a user, I want to see electric and gas bill amount and due date
            </span>
          </li>
          <li class="c0">
            <span class="c4">
              As a user, I want to receive notification through email before/on
              the due date of all my bills.
            </span>
          </li>
        </ol>
      </div>
    ),
  },
  {
    text: 'Contact Us',
    content: <div>
      <h1>No</h1>
    </div>,
  },
  {
    text: 'Terms Of Service',
    content: (
      <div>
        <h2>Web Site Terms and Conditions of Use</h2>

        <h3>1. Terms</h3>

        <p>
          By accessing this web site, you are agreeing to be bound by these web
          site Terms and Conditions of Use, all applicable laws and regulations,
          and agree that you are responsible for compliance with any applicable
          local laws. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site. The materials contained
          in this web site are protected by applicable copyright and trade mark
          law.
        </p>

        <h3>2. Use License</h3>

        <ol type="a">
          <li>
            Permission is granted to use Biller's web site for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
            <ol type="i">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on test's web site; or
              </li>
              <li>
                transfer the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ol>
          </li>
          <li>
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by test at any time. Upon
            terminating your viewing of these materials or upon the termination
            of this license, you must destroy any downloaded materials in your
            possession whether in electronic or printed format.
          </li>
        </ol>

        <h3>3. Disclaimer</h3>

        <ol type="a">
          <li>
            The materials on Biller's web site are provided "as is". Biller
            makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties, including without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights. Further, test does not warrant or make
            any representations concerning the accuracy, likely results, or
            reliability of the use of the materials on its Internet web site or
            otherwise relating to such materials or on any sites linked to this
            site.
          </li>
        </ol>

        <h3>4. Limitations</h3>

        <p>
          In no event shall Biller or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption,) arising out of the use or inability to
          use the materials on test's Internet site, even if test or a test
          authorized representative has been notified orally or in writing of
          the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
        </p>

        <h3>5. Site Terms of Use Modifications</h3>

        <p>
          Biller may revise these terms of use for its web site at any time
          without notice. By using this web site you are agreeing to be bound by
          the then current version of these Terms and Conditions of Use.
        </p>

        <h3>6. Governing Law</h3>

        <p>
          Any claim relating to Biller's web site shall be governed by the laws
          of the State of California without regard to its conflict of law
          provisions.
        </p>

        <p>General Terms and Conditions applicable to Use of a Web Site.</p>
      </div>
    ),
  },
  {
    text: 'Privacy Policy',
    content: (
      <div>
        <h2>Privacy Policy</h2>

        <p>
          Your privacy is very important to us. Accordingly, we have developed
          this Policy in order for you to understand how we collect, use,
          communicate and disclose and make use of personal information. The
          following outlines our privacy policy.
        </p>

        <ul>
          <li>
            Before or at the time of collecting personal information, we will
            identify the purposes for which information is being collected.
          </li>
          <li>
            We will collect and use of personal information solely with the
            objective of fulfilling those purposes specified by us and for other
            compatible purposes, unless we obtain the consent of the individual
            concerned or as required by law.
          </li>
          <li>
            We will only retain personal information as long as necessary for
            the fulfillment of those purposes.
          </li>
          <li>
            We will collect personal information by lawful and fair means and,
            where appropriate, with the knowledge or consent of the individual
            concerned.
          </li>
          <li>
            Personal data should be relevant to the purposes for which it is to
            be used, and, to the extent necessary for those purposes, should be
            accurate, complete, and up-to-date.
          </li>
          <li>
            We will protect personal information by reasonable security
            safeguards against loss or theft, as well as unauthorized access,
            disclosure, copying, use or modification.
          </li>
          <li>
            We will make readily available to customers information about our
            policies and practices relating to the management of personal
            information.
          </li>
        </ul>

        <p>
          We are committed to conducting our business in accordance with these
          principles in order to ensure that the confidentiality of personal
          information is protected and maintained.
        </p>
      </div>
    ),
  },
];
