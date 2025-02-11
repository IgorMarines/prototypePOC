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

export default function Create() {
    const { data, setData, errors, post, setError } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("patients.store"));
    }

    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Cadastrar paciente
                </h2>
            }
        >
            <div className="px-6 py-12">
                <Card>
                    <CardHeader>
                      <CardDescription>
                        Preencha os campos abaixo para cadastrar um novo paciente.
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                            setError("name", "");
                                        }}
                                        placeholder="Nome"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                            setError("email", "");
                                        }}
                                        placeholder="Email"
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => {
                                            setData("phone", e.target.value);
                                            setError("phone", "");
                                        }}
                                        placeholder="Telefone"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => {
                                            setData("address", e.target.value);
                                            setError("address", "");
                                        }}
                                        placeholder="Endereço"
                                    />
                                    <InputError message={errors.address} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => {
                                            setData("city", e.target.value);
                                            setError("city", "");
                                        }}
                                        placeholder="Cidade"
                                    />
                                    <InputError message={errors.city} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        value={data.state}
                                        onChange={(e) => {
                                            setData("state", e.target.value);
                                            setError("state", "");
                                        }}
                                        placeholder="Estado"
                                    />
                                    <InputError message={errors.state} />
                                </div>
                                <div>
                                    <label
                                        htmlFor="zip"
                                        className="block text-sm font-medium text-gray-700"
                                    ></label>
                                    <Input
                                        type="text"
                                        name="zip"
                                        id="zip"
                                        value={data.zip}
                                        onChange={(e) => {
                                            setData("zip", e.target.value);
                                            setError("zip", "");
                                        }}
                                        placeholder="CEP"
                                    />
                                    <InputError message={errors.zip} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit">Salvar</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </Authenticated>
    );
}
