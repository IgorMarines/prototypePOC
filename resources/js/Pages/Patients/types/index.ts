import { ReactNode } from "react";

type Patient = {
    id: number;
    name: string;
    email: string;
    phone: string;
    appointments: Appointment[];
    address: string;
    city: string;
    state: string;
    zip: string;
};

type Appointment = {
    id: number;
    date: string;
    description: string;
    patient: Patient;
    user: User;
    status: string;
    notes: Note[];
    service: { id: number; name: string; price: number };
};

type Note = {
    notes: ReactNode;
    id: number;
    appointment_id: number;
    user_id: number;
    note: string;
    created_at: string;
    user: User;
}

type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

type PatientPaginationData = {
    current_page: number;
    data: Patient[];
    first_page_url: string;
    from: number;
    last_page: number;
    next_page_url: string | null;
    last_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
};

export type { Patient, PatientPaginationData, Appointment };

