import MobileNav from '@/components/MobileNav';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User = {
    $id: 'u1234567890',
    email: 'john.doe@example.com',
    userId: 'user_001',
    dwollaCustomerUrl:
      'https://api.dwolla.com/customers/d1234567-89ab-cdef-0123-456789abcdef',
    dwollaCustomerId: 'd1234567-89ab-cdef-0123-456789abcdef',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    postalCode: '12345',
    dateOfBirth: '1985-06-15',
    ssn: '123-45-6789',
  };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={user} />
      <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
      {children}
    </main>
  );
}
