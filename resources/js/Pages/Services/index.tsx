import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Service } from "./types";

export default function Services({ ...props }: { services: Service[] }) {
    const headers = [
        "Nome",
        "Descrição",
        "Preço",
        "Duração",
        "Status",
        "Ações",
    ];

    function showStatusBadge(status: "active" | "inactive") {
        switch (status) {
            case "active":
                return <Badge className="bg-green-600">Ativo</Badge>;
            case "inactive":
                return <Badge className="bg-red-600">Inativo</Badge>;
        }
    }
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Services
                </h2>
            }
        >
            <div className="px-6 py-12">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Confira e gerencie os serviços cadastrados no
                            sistema.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {headers.map((header, index) => (
                                        <TableHead key={index}>
                                            {header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.services.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>
                                            {service.description}
                                        </TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(service.price)}
                                        </TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "unit",
                                                unit: "minute",
                                            }).format(service.duration)}
                                        </TableCell>
                                        <TableCell>
                                            {showStatusBadge(
                                                service.status as any
                                            )}
                                        </TableCell>
                                        <TableCell className="flex flex-row gap-4">
                                            <Link href={route('services.edit', {service: service.id})}>
                                                <Button className="bg-blue-600 hover:bg-blue-400">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button variant={"destructive"}>
                                                Excluir
                                            </Button>
                                            <Link
                                                href={route("services.show", {
                                                    service: service.id,
                                                })}
                                            >
                                                <Button className="bg-green-600 hover:bg-green-400">
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
