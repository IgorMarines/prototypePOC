import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

export default function CreateRole() {
    const { data, setData, errors, post } = useForm({
        name: "",
        description: "",
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route("roles.store"));
    }
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Criar Cargo
                </h2>
            }
        >
            <div className="py-12 px-6">
                <Card>
                    <CardHeader></CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
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
                                        onChange={(e) => setData("description", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <Button>Salvar</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
