import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Role } from "./types";

export default function EditRole({ role }: { role: Role }) {

  
  const { data, errors, processing, patch, setData } = useForm({
    name: role.name,
    description: role.description,
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    patch(route('roles.update', { role: role.id }))
  }
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Cargo
                </h2>
            }
        >
            <div className="py-12 px-6">
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                        >
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <label htmlFor="description">
                                        Descrição
                                    </label>
                                    <Input
                                        id="description"
                                        name="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button type="submit" disabled={processing} >Salvar</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
