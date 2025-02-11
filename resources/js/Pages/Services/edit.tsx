import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/Components/ui/select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Service } from "./types";

export default function Edit({...props}: {service: Service})  {
  const { data, setData, patch } = useForm({
    name: props.service.name,
    description: props.service.description,
    price: props.service.price,
    duration: props.service.duration,
    service_id: props.service.id,
    status: props.service.status,
  })

  function submit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    patch(route('services.update', props.service.id))
  }
  return (
    <Authenticated header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar serviço</h2>}>
      <div className="px-6 py-12">
        <Card>
          <CardHeader>
            <CardDescription>
              Edite os dados do serviço {props.service.name}
            </CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <Input type="text" name="name" value={data.name} onChange={(e) => setData('name', e.currentTarget.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Descrição</label>
                <Input type="text" name="description" value={data.description} onChange={(e) => setData('description', e.currentTarget.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Preço</label>
                <Input type="number" name="price" value={data.price} onChange={(e) => setData('price', Number(e.currentTarget.value))} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="duration">Duração (minutos)</label>
                <Input type="number" name="duration" value={data.duration} onChange={(e) => setData('duration', Number(e.currentTarget.value))} />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Select defaultValue={props.service.status} onValueChange={(v) => setData('status', v)}>
                <SelectTrigger>
                  <SelectValue>
                    {props.service.status === 'active' ? 'Ativo' : 'Inativo'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Salvar</Button>
          </CardFooter>
          </form>
        </Card>
      </div>
    </Authenticated>
  )
}