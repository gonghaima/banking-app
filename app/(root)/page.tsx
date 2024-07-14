import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  
  // const accounts = await getAccounts({
  //   userId: loggedIn.$id,
  // });

  // if (!accounts) return;

  // const accountsData = accounts?.data;
  // const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  // const account = await getAccount({ appwriteItemId });

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
        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId='appwriteItemId-1'
        />
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
