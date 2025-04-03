
import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'
import RootNav from '@/components/RootNav';

async function RootLayout({ children }: { children: ReactNode }) {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) redirect('/sign-in');

    return (
        <div className='root-layout min-h-screen flex flex-col'>
            <RootNav />

            <main className='flex-1 py-8 px-4 max-w-7xl mx-auto w-full'>
                {children}
            </main>
        </div>
    )
}

export default RootLayout;