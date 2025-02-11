import { Appointments } from "@/types/Appointments";

type Service = {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    status: string;
};

type ServiceData = {
    appointmentsQtde: number;
    valueEarned: number;
    appointments: Appointments;
};

export type { Service, ServiceData };
