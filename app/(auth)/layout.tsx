import React, {ReactNode} from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Yoom",
    description: "Video calling app",
    icons: {
        icon: '/icons/logo.svg'
    }

};

const AuthLayout = ({ children }:
                    { children: ReactNode}) => {
    return (
        <main className="flex w-full h-screen justify-center items-center">
            {children}
        </main>
    );
};

export default AuthLayout;
