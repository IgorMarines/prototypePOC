import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Service, ServiceData } from "./types";

export default function Show({...props}: {service: Service, serviceData: ServiceData}) {

  function showStatusBadge(status: string) {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-600">Ativo</Badge>;
      case "canceled":
        return <Badge className="bg-red-600">Cancelado</Badge>;
      case "completed":
        return <Badge className="bg-blue-600">Realizado</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600">Pendente</Badge>;
  }
}
  return (
    <Authenticated header={
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        {props.service.name}
      </h2>
    }>
      <div className="px-6 py-12">
        <Card>
          <CardHeader>
            <CardDescription>
              {props.service.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold">Preço</span>
                <span>R$ {props.service.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Duração</span>
                <span>{props.service.duration} minutos</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Status</span>
                <span>{props.service.status}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Agendamentos cadastrados com o serviço</span>
                <span>{props.serviceData.appointmentsQtde}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Valor total aproximado arrecadado com o serviço (base no valor atual do serviço)</span>
                <span>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.serviceData.valueEarned)}</span>
              </div>
            </div> 
          </CardContent>
        </Card>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              Agendamentos
            </CardTitle>
            <CardDescription>
              Confira os agendamentos cadastrados com o serviço.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.serviceData.appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient.name}</TableCell>
                    <TableCell>{appointment.user.name}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleTimeString()}</TableCell>
                    <TableCell>{showStatusBadge(appointment.status)}</TableCell>
                    <TableCell>
                      <Link href={route('appointments.show', {appointment: appointment.id})}>
                        <Button className="bg-blue-600 hover:bg-blue-400">Visualizar</Button>
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
  )
}