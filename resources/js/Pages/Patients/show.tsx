import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Patient } from "./types";

export default function Show({ ...props }: { patient: Patient }) {
    function returnBadgeForStatus(status: string) {
        switch (status) {
            case "scheduled":
                return <Badge className="bg-blue-600">Agendado</Badge>;
            case "completed":
                return <Badge className="bg-green-600">Realizado</Badge>;
            case "canceled":
                return <Badge className="bg-red-600">Cancelado</Badge>;
            case "pending":
                return <Badge className="bg-yellow-600">Pendente</Badge>;
            default:
                return <Badge className="bg-slate-600">Indefinido</Badge>;
        }
    }

    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.patient.name}
                </h2>
            }
        >
            <div className="px-6 py-12">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Confira os detalhes do paciente {props.patient.name}{" "}
                            abaixo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Nome
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.name}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Email
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.email}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Telefone para contato
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.phone}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Endereço
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.address}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Cidade
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.city}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600">
                                        Estado
                                    </span>
                                    <span className="text-lg">
                                        {props.patient.state}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Separator className="mt-8" />
                        {props.patient.appointments.length > 0 && (
                            <div className="mt-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Procedimentos</CardTitle>
                                        <CardDescription>
                                            Lista de procedimentos agendados ou
                                            já realizados para o paciente.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {props.patient.appointments.map(
                                            (appointment, index) => (
                                                <Accordion
                                                    key={appointment.id}
                                                    type="single"
                                                    collapsible
                                                    className="w-full"
                                                >
                                                    <AccordionItem
                                                        value={String(
                                                            appointment.id
                                                        )}
                                                    >
                                                        <AccordionTrigger className="w-full flex flex-row">
                                                            <div>
                                                                <span className="text-lg text-blue-600">
                                                                    Agendamento
                                                                    do dia{" "}
                                                                    {new Date(
                                                                        appointment.date
                                                                    ).toLocaleDateString()}{" "}
                                                                    -{" "}
                                                                    {
                                                                        appointment.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="grid grid-cols-2 grid-rows-2 gap-8">
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-gray-600">
                                                                        Descrição
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        {
                                                                            appointment.description
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-gray-600">
                                                                        Data
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        {new Date(
                                                                            appointment.date
                                                                        ).toLocaleDateString()}{" "}
                                                                        as{" "}
                                                                        {new Date(
                                                                            appointment.date
                                                                        ).toLocaleTimeString()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-gray-600">
                                                                        Profissional
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        {
                                                                            appointment
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-gray-600">
                                                                        Status
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        {returnBadgeForStatus(
                                                                            appointment.status
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-gray-600">
                                                                        Valor
                                                                    </span>
                                                                    <span className="text-lg">
                                                                        R${" "}
                                                                        {
                                                                            appointment
                                                                                .service
                                                                                .price
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end mt-8">
                                                                <Link
                                                                    href={route(
                                                                        "appointments.show",
                                                                        {
                                                                            appointment:
                                                                                appointment.id,
                                                                        }
                                                                    )}
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        className="bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
                                                                    >
                                                                        Ver
                                                                        detalhes
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            )
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        {props.patient.appointments.length === 0 && (
                            <div className="mt-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Procedimentos</CardTitle>
                                        <CardDescription>
                                            Nenhum procedimento agendado para
                                            este paciente.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Link
                            href={route("appointments.create", {
                                patient: props.patient.id,
                            })}
                        >
                            <Button variant={"default"}>
                                Agendar Procedimento
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </Authenticated>
    );
}
