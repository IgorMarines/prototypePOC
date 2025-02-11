interface Root {
    id: number;
    patient_id: number;
    user_id: number;
    service_id: number;
    date: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    patient: Patient;
    user: User;
    service: Service;
}

interface Patient {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    role_id: number;
}

interface Service {
    id: number;
    name: string;
    description: string;
    price: string;
    status: string;
    duration: number;
    created_at: string;
    updated_at: string;
}

export type Appointments = Root[];
