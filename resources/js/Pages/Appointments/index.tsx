import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Appointments as appointmentstype } from "@/types/Appointments";
import { Calendar } from "@/Components/ui/calendar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";

export default function Appointments({
    appointments, services
}: {
    appointments: appointmentstype;
    services: any[]
}) {
    const [search, setSearch] = useState("");
    const [searchService, setSearchService] = useState("")
    const [position, setPosition] = useState("bottom");
    const headers = [
        { name: "Id", showSelect: false },
        { name: "Paciente", showSelect: false },
        {
            name: "Horário",
            showSelect: true,
            Filter: () => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            className="bg-transparent border-none shadow-none ml-1"
                        >
                            <Button variant="outline">
                                <Filter />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-auto">
                            <Calendar mode="single" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        { name: "Profissional", showSelect: false },
        {
            name: "Tratamento",
            showSelect: true,
            descriptionSelect: "Selecione o tratamento",
            Filter: () => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button variant="outline" className="bg-transparent border-none shadow-none ml-1">
                                <Filter />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuRadioGroup value={searchService} onValueChange={(e) => {
                                setSearchService(e)
                                router.get(route("appointments.searchService", { service_id: e }))
                            }}>
                                <DropdownMenuRadioItem value={''}>Selecione um valor</DropdownMenuRadioItem>
                                {services.map((service) => (
                                    <DropdownMenuRadioItem value={service.id}>
                                        {service.name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        },
        {
            name: "Ação",
            showSelect: false,
        }
    ];

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Atendimento
                </h2>
            }
        >
            <div className="py-12 px-6">
                <div className="flex flex-row w-full">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/4 mb-3 mr-1 rounded-xl focus:ring-terciary-blue focus-visible:ring-terciary-blue"
                        type="email"
                        placeholder="Pesquisar"
                    />
                    <Button
                        type="submit"
                        onClick={() => {
                            router.get(
                                route("appointments.search", { search })
                            );
                        }}
                        className="rounded-full   bg-blue-dark-900 hover:bg-terciary-blue"
                    >
                        <Search />
                    </Button>
                </div>
                <Card>
                    <Table>
                        <TableCaption>
                            Aqui estão todos os seus agendamentos.
                            <Pagination></Pagination>
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {headers.map((head) => (
                                    <TableCell>{head.name}
                                        {head.showSelect && (
                                            <>
                                                {head.Filter && <head.Filter />}

                                            </>)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.length >= 1 && (
                                <>
                                    {appointments.map((appointment) => (
                                        <TableRow className="py-3 hover:bg-[#8AC6F0] text-blue-dark-900 hover:text-white">
                                            <TableCell>
                                                {appointment.id}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.patient.name}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.date}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.service.name}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={route(
                                                        "appointments.show",
                                                        {
                                                            appointment:
                                                                appointment.id,
                                                        }
                                                    )}
                                                >
                                                    <Button className="bg-blue-600">Visualizar</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </Authenticated>
    );
}
