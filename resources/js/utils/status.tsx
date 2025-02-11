import { Badge } from "@/Components/ui/badge";

export const statusMap = [
    { value: 'scheduled', label: 'Agendado', className: 'bg-blue-600' },
    { value: 'pending_contact', label: 'Pendente de Contato', className: 'bg-yellow-600' },
    { value: 'done', label: 'Concluído', className: 'bg-blue-600' },
    { value: 'results_done', label: 'Resultados Concluídos', className: 'bg-blue-600' },
    { value: 'pending_results', label: 'Pendente de Resultados', className: 'bg-yellow-600' },
    { value: 'completed', label: 'Concluído', className: 'bg-green-600' },
    { value: 'canceled', label: 'Cancelado', className: 'bg-red-600' },
    { value: 'interrupted', label: 'Interrompido', className: 'bg-red-600' }
  ];

export const translateStatus = (status: string) => {
  const statusObj = statusMap.find((item) => item.value === status);
  return statusObj ? <Badge className={statusObj.className}>{statusObj.label}</Badge> : <Badge>Indefinido</Badge>;
};
