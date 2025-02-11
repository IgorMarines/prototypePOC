import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Calendar } from "@/Components/ui/calendar";
import InputError from "@/Components/InputError";

export default function Agendamento() {
    const [patientId, setPatientId] = useState(1);


    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        description: "",
        service_id: "",
        patient_id: patientId,
        date: "",
        time: "",
    });

    const services = [
        { id: 1, name: "Consulta Médica" },
        { id: 2, name: "Exame Médico" },
        { id: 3, name: "Consulta Dentária" },
        { id: 4, name: "Exame Dentário" },
    ];

    const professionals = [
        { id: 1, name: "Dr. Maria Silva", specialty: "Médica" },
        { id: 2, name: "Dr. João Silva", specialty: "Dentista" },
        { id: 3, name: "Dr. Pedro Silva", specialty: "Enfermeira" },
    ];

    const times = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
    ];


    function formatDateTime(date: Date) {
        if (!(date instanceof Date)) date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    interface FormData {
        user_id: string;
        description: string;
        service_id: string;
        patient_id: string;
        date: string;
        time: string;
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("appointments.store"))
    }

    return (
        <Authenticated header={<h2 className="text-xl font-semibold text-gray-800">Agendamento</h2>}>
            <div className="py-12 px-6 max-w-3xl mx-auto">
                <Card>
                    <CardHeader />
                    <CardContent>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Data</Label>
                                <Calendar
                                    mode="single"
                                    selected={data.date ? new Date(data.date) : undefined}
                                    onSelect={(date) => date && setData('date', formatDateTime(date))}
                                />
                                <InputError message={errors.date}
                                className="mt-2" />
                            </div>
                            <div>
                                <Label>Horário</Label>
                                <Select onValueChange={(value) => setData("time", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um horário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {times.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.time}
                                className="mt-2" />

                                <div className="mt-4">
                                    <Label>Descrição</Label>
                                    <Textarea
                                        className="h-48"
                                        maxLength={255}
                                        value={data.description}
                                        placeholder="Descrição do Agendamento"
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Tratamento</Label>
                                <Select onValueChange={(value) => setData("service_id", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um tratamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map((s) => (
                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.service_id}/>
                            </div>

                            <div>
                                <Label>Profissional</Label>
                                <Select onValueChange={(value) => setData("user_id", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um profissional" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {professionals.map((p) => (
                                            <SelectItem key={p.id} value={p.id.toString()}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.user_id}
                                className="mt-2" />
                            </div>

                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Salvando..." : "Salvar"}
                                </Button>
                            </div>

                            {errors.description && <p className="text-red-500">{errors.description}</p>}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
