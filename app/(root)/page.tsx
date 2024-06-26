import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react';

function Home() {
  const loggedIn = { firstName: 'Adrian' };
  const account = {
    transactions: [
      {
        id: 1,
        amount: 100,
        category: 'Food',
        date: '2021-10-10',
        description: 'Bought some food',
        type: 'expense',
      },
      {
        id: 2,
        amount: 200,
        category: 'Salary',
        date: '2021-10-10',
        description: 'Got paid',
        type: 'income',
      },
      {
        id: 3,
        amount: 300,
        category: 'Transport',
        date: '2021-10-10',
        description: 'Took a cab',
        type: 'expense',
      },
    ],
  };
  const accountsData = [
    {
      id: 1,
      name: 'Bank of America',
      balance: 1250.35,
      type: 'savings',
    },
    {
      id: 2,
      name: 'Chase Bank',
      balance: 1250.35,
      type: 'checking',
    },
    {
      id: 3,
      name: 'Wells Fargo',
      balance: 1250.35,
      type: 'savings',
    },
  ];
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
}

export default Home;
