import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { PatientPaginationData } from "./types";

export default function Patients({
    ...props
}: {
    patients: PatientPaginationData;
}) {
    const headers = ["Nome", "Email", "Telefone", "Agendamentos", 'Ações'];

    const params = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState<string>(params.get("search") || "");

    function handleSearch() {
        router.get(route("patients.index"), { search });
    }
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pacientes
                </h2>
            }
        >
            <div className="px-6 py-12">
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <div className="w-full">
                            <label>Buscar paciente</label>
                            <div className="flex flex-row w-1/2 gap-2 items-center">
                                <Input
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    placeholder="Insira um valor para pesquisar por um paciente (email, telefone, nome, etc)"
                                />
                                <Button onClick={handleSearch}>Buscar</Button>
                                {params.get("search") && (
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            router.get(route("patients.index"));
                                        }}
                                    >
                                        Limpar
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Link href={route("patients.create")}>
                            <Button>Adicionar paciente</Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {headers.map((header, idx) => (
                                        <TableHead key={idx}>
                                            {header}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.patients.data.map((patient, idx) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="flex w-2/3 justify-between items-center">
                                            {patient.name}
                                        </TableCell>
                                        <TableCell>{patient.email}</TableCell>
                                        <TableCell>{patient.phone}</TableCell>
                                        <TableCell>
                                                <Badge
                                                    variant={"secondary"}
                                                    className="bg-blue-400 text-white hover:bg-blue-600"
                                                >
                                                    {
                                                        patient.appointments
                                                            .length
                                                    }{" "}
                                                    agendamento (s)
                                                </Badge>
                                        </TableCell>
                                        <TableCell className="flex gap-4">
                                            <Link
                                                href={route("patients.edit", {
                                                    patient: patient.id,
                                                })}
                                            >
                                                <Button variant="outline">
                                                    Editar Paciente
                                                </Button>
                                            </Link>
                                            <Link href={route('appointments.create', {patient: patient.id})}>
                                                <Button className="bg-blue-400 hover:bg-blue-600" variant="default">
                                                    Novo agendamento
                                                </Button>
                                            </Link>
                                            <Link
                                                href={route("patients.show", {
                                                    patient: patient.id,
                                                })}
                                            >
                                                <Button className="bg-blue-600 hover:bg-blue-400">
                                                    Visualizar
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Pagination>
                            <PaginationContent>
                                {props.patients.links.map((item, index) => {
                                    if (item.label.includes("Previous")) {
                                        return (
                                            <PaginationItem key={index}>
                                                <Link
                                                    href={item.url || "#"}
                                                    as="button"
                                                >
                                                    <PaginationPrevious />
                                                </Link>
                                            </PaginationItem>
                                        );
                                    }

                                    if (item.label.includes("Next")) {
                                        return (
                                            <PaginationItem key={index}>
                                                <Link
                                                    href={item.url || "#"}
                                                    as="button"
                                                >
                                                    <PaginationNext />
                                                </Link>
                                            </PaginationItem>
                                        );
                                    }

                                    return (
                                        <PaginationItem key={index}>
                                            <Link
                                                href={item.url || "#"}
                                                as="button"
                                            >
                                                <PaginationLink
                                                    isActive={item.active}
                                                >
                                                    {item.label}
                                                </PaginationLink>
                                            </Link>
                                        </PaginationItem>
                                    );
                                })}
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </div>
        </Authenticated>
    );
}
