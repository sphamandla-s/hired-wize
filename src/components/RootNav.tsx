'use client'

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image';
import Link from 'next/link';
import { LogOut, Menu } from 'lucide-react';
import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


function RootNav() {
    const pathname = usePathname();
    
  return (
    <nav className='w-full border-b'>
                <div className='flex items-center justify-between px-4 py-3 max-w-7xl mx-auto'>
                    {/* Mobile Menu Button */}
                    <div className='md:hidden'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-8 w-8" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="sm:w-64">
                                <div className="flex flex-col h-full">
                                    {/* Mobile Navigation Header */}
                                    <div className="flex items-center gap-2 mb-8">
                                        <Image
                                            src='/logo.svg'
                                            alt='HiredWize logo'
                                            width={38}
                                            height={32}
                                            priority
                                        />
                                        <h2 className='text-primary-100 font-semibold text-xl'>HiredWize</h2>
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <nav className="flex flex-col gap-2">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    {/* Mobile Logout Button */}
                                    <div className="mt-auto pt-4 border-t">
                                        <SheetClose asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-destructive hover:bg-destructive/10"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Logout
                                            </Button>
                                        </SheetClose>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='flex items-center gap-8'>
                        <Link href="/" className='flex items-center gap-2 hover:opacity-75 transition-opacity'>
                            <Image
                                src='/logo.svg'
                                alt='HiredWize logo'
                                width={38}
                                height={32}
                                priority
                            />
                            <h2 className='text-primary-100 font-semibold text-xl'>HiredWize</h2>
                        </Link>
                        <div className='hidden md:flex items-center gap-6'>
                            {navLinks.map((link) => (
                                <Link
                                    href={link.href}
                                    className={cn(
                                        'text-sm font-medium hover:text-primary transition-colors',
                                        pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className='flex items-center gap-4'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className='rounded-full hover:bg-accent/50'
                                >
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className='w-48 mt-2 rounded-lg shadow-lg'
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className='cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent'>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className='cursor-pointer px-4 py-2 hover:bg-accent focus:bg-accent'>
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer px-4 py-2 text-destructive hover:bg-destructive/10 focus:bg-destructive/10'>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>
  )
}

export default RootNav