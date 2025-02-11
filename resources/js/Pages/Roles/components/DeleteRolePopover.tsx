import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { useForm } from "@inertiajs/react";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export function DeleteRolePopover({ roleId }: {roleId: number}) {
  const [isOpen, setIsOpen] = useState(false);

  const { processing, delete: destroy } = useForm({
    roleId,
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    destroy(route('roles.destroy', { role: roleId }))
    }
    return (
        <Popover open={isOpen} onOpenChange={(open) => {setIsOpen(open)}}>
          <PopoverTrigger asChild>
            <Button variant={'destructive'} size={'icon'} onClick={() => {setIsOpen(true)}}>
              <TrashIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-2">
              <p className="text-sm text-gray-600">
                Tem certeza que deseja excluir este cargo?
              </p>
              <p className="text-sm text-gray-600">
                Esta ação não poderá ser desfeita.
              </p>
              <form onSubmit={submit}>
              <div className="mt-4 gap-2 flex justify-end">
                <Button variant={'outline'} size={'sm'} onClick={() => {setIsOpen(false)}} type="button">Cancelar</Button>
                <Button variant={'destructive'} size={'sm'} disabled={processing} type="submit">Excluir</Button>
              </div>
              </form>
            </div>
          </PopoverContent>
        </Popover>
    );

}