import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  // const accounts = await getAccounts({ 
  //   userId: loggedIn.$id 
  // })
  const accounts = {
    data: [
      {
        id: 1,
        name: 'Bank of America',
        currentBalance: 500,
        mask: '1234',
        appwriteItemId: '1',
        officialName: 'Bank of America - Checking',
      },
      {
        id: 2,
        name: 'Chase Bank',
        currentBalance: 1000,
        mask: '5678',
        appwriteItemId: '2',
        officialName: 'Chase Bank - Savings',
      },
    ],
  };

  if (!accounts) return;

  if(!accounts) return;
  
  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox 
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />

      <section className="size-full pt-5">
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}

export default Transfer