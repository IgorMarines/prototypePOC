import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import Timeline from "./Timeline/Timeline";
import { translateStatus } from "@/utils/status";


import { Appointment } from "../Patients/types";

export default function Show({ appointment }: { appointment: Appointment }) {
    console.log(appointment)
    const { data, setData, post, processing, errors } = useForm({
        notes: "",
        appointment_id: appointment.id,
        user_id: appointment.user.id
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('appointments.notes.store'));
    }

    const convertToBRL = (price: any) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    const updateStatus = (newStatus: string) => {
        post(route('appointments.updateStatus', { appointment_id: appointment.id, status: newStatus }));
    }

    return (
        <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Agendamentos</h2>}>
            <div className="px-6 py-12">
                <Card className="mb-6 p-4 overflow-auto max-h-30">
                    <Timeline appointment={appointment} />
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                            Detalhes do Agendamento:
                            {translateStatus(appointment.status)}
                        </CardTitle>

                        <div className="mt-4 flex gap-4 overflow-auto max-h-30">
                            <Button onClick={() => updateStatus('scheduled')} className="bg-blue-600" disabled={appointment.status === 'scheduled'}>
                                Agendar
                            </Button>
                            <Button onClick={() => updateStatus('completed')} className="bg-green-600" disabled={appointment.status === 'completed'}>
                                Concluir
                            </Button>
                            <Button onClick={() => updateStatus('canceled')} className="bg-red-600" disabled={appointment.status === 'canceled'}>
                                Cancelar
                            </Button>
                            <Button onClick={() => updateStatus('pending')} className="bg-yellow-600" disabled={appointment.status === 'pending'}>
                                Pendência
                            </Button>
                        </div>

                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full mt-5">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Informações do Paciente</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Nome</h3>
                                            <p>{appointment.patient.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                                            <p>{appointment.patient.email}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Informações do Serviço</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Tipo de serviço</h3>
                                            <p>{appointment.service.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Preço</h3>
                                            <p>{convertToBRL(appointment.service.price)}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Informações do Agendamento</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Data</h3>
                                            <p>{appointment.date}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">Descrição</h3>
                                            <p>{appointment.description}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Comentários</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-4 overflow-auto max-h-[300px]">
                                        <form onSubmit={submit}>
                                            <textarea
                                                className="w-full p-2 border h-[100px] resize-none border-gray-300 rounded"
                                                placeholder="Digite o comentário"
                                                onChange={(e) => setData('notes', e.target.value)}
                                                value={data.notes}
                                            />
                                            <Button type="submit" className="w-full bg-blue-600" disabled={processing}>
                                                {processing ? "Enviando..." : "Adicionar Comentário"}
                                            </Button>
                                        </form>
                                        {appointment.notes && appointment.notes.map((comment, index) => (
                                            <Card key={index}>
                                                <CardHeader>
                                                    <CardTitle>
                                                        {comment.created_at} - {comment.user_id}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p>{comment.notes}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    )
}