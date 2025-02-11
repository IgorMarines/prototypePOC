import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Role } from "./types";

type User = {
    id: number;
    name: string;
    email: string;    
}

export default function ShowRoleScreen({ users, role }: {users: User[], role: Role}) {
  return (
    <Authenticated
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Detalhes do Cargo {role.name}
        </h2>
      }
    >
      <div className="py-12 px-6">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name">Nome</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={role.name}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="description">Descrição</label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  value={role.description}
                  disabled
                />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold leading-tight text-gray-800">
                Usuários com este cargo
              </h3>
              <Table>
                <TableCaption>
                  Usuários com o cargo {role.name}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  )
}