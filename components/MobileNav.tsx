'use client'
import React from 'react';
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import {sidebarLinks} from "@/constants/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src='icons/hamburger.svg'
                        alt='hamburger icon'
                        width={36}
                        height={36}
                        className='cursor-pointer sm:hidden'
                    />
                </SheetTrigger>
                <SheetContent side='left' className='border-none'>
                    <SheetHeader>
                        <span className="sr-only">
                            <SheetTitle>Navigation</SheetTitle>
                        </span>
                        <Link href={'/'} className={'flex items-center gap-1'}>
                            <Image
                                src='/icons/logo.svg'
                                alt={'Yoom logo'}
                                width={32}
                                height={32}
                                className='max-sm:size-10'
                            />
                            <p className="text-[26px] font-extrabold ">
                                Yoom
                            </p>
                        </Link>
                        <div className="flex h-[calc(100vh-72px)]
                        lex-col justify-between overflow-y-auto">
                            <SheetClose asChild>
                                <section className="flex h-full flex-col gap-6 pt-16">
                                    {sidebarLinks.map((link) => {
                                        const isActive =
                                            link.route === '/'
                                                ? pathname === '/'
                                                : pathname.startsWith(link.route);
                                        return (
                                            <SheetClose asChild key={link.route}>
                                                <Link
                                                    key={link.label}
                                                    href={link.route}
                                                    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',
                                                        {'bg-sidebar-primary text-sidebar-primary-foreground': isActive,})}
                                                >
                                                    <Image
                                                        src={link.imgUrl}
                                                        alt={link.label}
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <p className={'font-semibold'}>
                                                        {link.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>
                                        )
                                    })}
                                </section>
                            </SheetClose>
                        </div>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
