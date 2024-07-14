/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from 'clsx';
import qs from 'query-string';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));
// export const parseStringify = (value: any) => value;

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, '');
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case 'depository':
      return {
        bg: 'bg-blue-25',
        lightBg: 'bg-blue-100',
        title: 'text-blue-900',
        subText: 'text-blue-700',
      };

    case 'credit':
      return {
        bg: 'bg-success-25',
        lightBg: 'bg-success-100',
        title: 'text-success-900',
        subText: 'text-success-700',
      };

    default:
      return {
        bg: 'bg-green-25',
        lightBg: 'bg-green-100',
        title: 'text-green-900',
        subText: 'text-green-700',
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split('/');

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? 'Processing' : 'Success';
};

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state:
      type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
    postalCode:
      type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
  });

export const currentTransactions = [
  {
    id: '1',
    $id: '1',
    name: 'Grocery Store',
    paymentChannel: 'card',
    type: 'debit',
    accountId: 'acc123',
    amount: 50.75,
    pending: false,
    category: 'Groceries',
    date: '2024-07-01T14:48:00.000Z',
    image: 'grocery.jpg',
    $createdAt: '2024-07-01T14:50:00.000Z',
    channel: 'POS',
    senderBankId: 'bank123',
    receiverBankId: 'bank456',
  },
  {
    id: '2',
    $id: '2',
    name: 'Salary',
    paymentChannel: 'bank transfer',
    type: 'credit',
    accountId: 'acc456',
    amount: 2500.0,
    pending: false,
    category: 'Income',
    date: '2024-07-05T09:00:00.000Z',
    image: 'salary.jpg',
    $createdAt: '2024-07-05T09:05:00.000Z',
    channel: 'Bank Transfer',
    senderBankId: 'bank789',
    receiverBankId: 'bank123',
  },
  {
    id: '3',
    $id: '3',
    name: 'Electricity Bill',
    paymentChannel: 'bank transfer',
    type: 'debit',
    accountId: 'acc789',
    amount: 120.45,
    pending: false,
    category: 'Utilities',
    date: '2024-07-07T17:30:00.000Z',
    image: 'electricity.jpg',
    $createdAt: '2024-07-07T17:35:00.000Z',
    channel: 'Online',
    senderBankId: 'bank123',
    receiverBankId: 'bank456',
  },
  {
    id: '4',
    $id: '4',
    name: 'Online Shopping',
    paymentChannel: 'card',
    type: 'debit',
    accountId: 'acc012',
    amount: 89.99,
    pending: false,
    category: 'Shopping',
    date: '2024-07-09T12:15:00.000Z',
    image: 'shopping.jpg',
    $createdAt: '2024-07-09T12:20:00.000Z',
    channel: 'E-commerce',
    senderBankId: 'bank456',
    receiverBankId: 'bank789',
  },
  {
    id: '5',
    $id: '5',
    name: 'Gym Membership',
    paymentChannel: 'direct debit',
    type: 'debit',
    accountId: 'acc345',
    amount: 45.0,
    pending: false,
    category: 'Health & Fitness',
    date: '2024-07-10T07:30:00.000Z',
    image: 'gym.jpg',
    $createdAt: '2024-07-10T07:35:00.000Z',
    channel: 'Direct Debit',
    senderBankId: 'bank789',
    receiverBankId: 'bank012',
  },
  {
    id: '6',
    $id: '6',
    name: 'Freelance Payment',
    paymentChannel: 'paypal',
    type: 'credit',
    accountId: 'acc678',
    amount: 300.0,
    pending: false,
    category: 'Income',
    date: '2024-07-11T10:00:00.000Z',
    image: 'freelance.jpg',
    $createdAt: '2024-07-11T10:05:00.000Z',
    channel: 'PayPal',
    senderBankId: 'bank012',
    receiverBankId: 'bank345',
  },
  {
    id: '7',
    $id: '7',
    name: 'Restaurant',
    paymentChannel: 'card',
    type: 'debit',
    accountId: 'acc901',
    amount: 75.5,
    pending: false,
    category: 'Dining',
    date: '2024-07-12T20:00:00.000Z',
    image: 'restaurant.jpg',
    $createdAt: '2024-07-12T20:05:00.000Z',
    channel: 'POS',
    senderBankId: 'bank345',
    receiverBankId: 'bank678',
  },
  {
    id: '8',
    $id: '8',
    name: 'Subscription Service',
    paymentChannel: 'direct debit',
    type: 'debit',
    accountId: 'acc234',
    amount: 12.99,
    pending: false,
    category: 'Entertainment',
    date: '2024-07-13T08:00:00.000Z',
    image: 'subscription.jpg',
    $createdAt: '2024-07-13T08:05:00.000Z',
    channel: 'Direct Debit',
    senderBankId: 'bank678',
    receiverBankId: 'bank901',
  },
];
