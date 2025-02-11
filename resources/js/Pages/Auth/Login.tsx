import InputError from '@/Components/InputError';
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';


export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email" className='text-blue-dark-900'>Email</label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-blue-dark-900 focus:ring-terciary-blue focus-visible:ring-terciary-blue"
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className='text-blue-dark-900'>Senha</label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-blue-dark-900 focus:ring-terciary-blue focus-visible:ring-terciary-blue"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className='data-[state=checked]:bg-terciary-blue border border-primary-blue '
                            onCheckedChange={(e) => {
                                setData(
                                    'remember',
                                    e as boolean
                                )

                            }}
                  
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Lembre-me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <a
                            href={route('password.request')}
                            className="rounded-md text-sm text-secondary-blue underline hover:text-terciary-blue   "
                        >
                            Esqueceu sua senha?
                        </a>
                    )}

                    <Button className="ms-4 bg-secondary-blue hover:bg-terciary-blue" disabled={processing}>
                        Entrar
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
