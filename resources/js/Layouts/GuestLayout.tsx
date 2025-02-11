import {
    Card,
    CardContent,
    CardHeader
} from "@/Components/ui/card";
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';


export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <img src="/favicon.png" alt="Logo" className="w-20 h-20" />
                </Link>
            </div>

            <Card className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <CardHeader>

                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    );
}
