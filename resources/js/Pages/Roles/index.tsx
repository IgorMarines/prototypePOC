import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import { DeleteRolePopover } from "./components/DeleteRolePopover";
import { Role } from "./types";

export default function Roles({ roles }: { roles: Role[] }) {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gerenciar Cargos
                </h2>
            }
        >
            <div className="py-12 px-6">
                <div className="flex w-full justify-end mb-6">
                <Link href={route('roles.create')} >
                  <Button>Adicionar Cargo</Button>
                </Link>
                </div>
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>
                                Cargos cadastrados no sistema
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="flex justify-between max-w-[40%]">
                                            {role.name}
                                        </TableCell>
                                        <TableCell>
                                            {role.description}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link href={route('roles.edit', {role: role.id})}>
                                              <Button variant={'outline'} size={'icon'}>
                                                <PencilIcon />
                                              </Button>
                                            </Link>
                                            <DeleteRolePopover roleId={role.id} />
                                            <Link href={route('roles.show', {role: role.id})}>
                                                <Button className="bg-blue-600 hover:bg-blue-400 ">
                                                    Visualizar
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
