import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Patient } from "./types";

export default function Edit({ ...props }: { patient: Patient }) {
    const { data, setData, errors, patch } = useForm({
        name: props.patient.name,
        email: props.patient.email,
        phone: props.patient.phone,
        address: props.patient.address,
        city: props.patient.city,
        state: props.patient.state,
        zip: props.patient.zip,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        patch(route("patients.update", props.patient.id));
    }

    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar paciente
                </h2>
            }
        >
            <div className="px-6 py-12">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Confira e edite se necessário os dados do paciente{" "}
                            {props.patient.name}
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>Nome</label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <Input
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div>
                                    <label>Telefone</label>
                                    <Input
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div>
                                    <label>Endereço</label>
                                    <Input
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div>
                                    <label>Cidade</label>
                                    <Input
                                        value={data.city}
                                        onChange={(e) =>
                                            setData("city", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.city} />
                                </div>
                                <div>
                                    <label>Estado</label>
                                    <Input
                                        value={data.state}
                                        onChange={(e) =>
                                            setData("state", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.state} />
                                </div>
                                <div>
                                    <label>CEP</label>
                                    <Input
                                        value={data.zip}
                                        onChange={(e) =>
                                            setData("zip", e.target.value)
                                        }
                                    />
                                    <InputError message={errors.zip} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">Salvar</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </Authenticated>
    );
}
