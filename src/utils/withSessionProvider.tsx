import { SessionProvider } from "next-auth/react";

export function withSessionProvider({ children }: any) {
    return <SessionProvider>
        {children}
    </SessionProvider>;
}