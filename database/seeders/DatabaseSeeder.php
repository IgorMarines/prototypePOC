<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->createRoles();

        $this->createTestUser();

        $this->createPatients();

        $this->createUsers();

        $this->createServices();

        $this->createAppointments();

    }

    private function createRoles(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'description' => 'Administrator do sistema',
                'slug' => 'adm',
            ],
            [
                'name' => 'Dentista',
                'description' => 'Dentista profissional cadastrado',
                'slug' => 'dent',
            ],
            [
                'name' => 'Recepcionista',
                'description' => 'Recepcionista do consultório',
                'slug' => 'rec',
            ]
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }

    private function createPatients(): void
    {
        Patient::factory(100)->create();
    }

    private function createUsers(): void
    {
        User::factory(10)->create();
    }

    private function createTestUser(): void
    {
        User::create([
            'name' => 'Dev User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role_id' => Role::where('slug', 'adm')->first()->id,
        ]);
    }

    private function createServices(): void
    {
        $services = [
            [
                'name' => 'Consulta',
                'description' => 'Consulta de rotina',
                'price' => 100.00,
                'status' => 'active',
                'duration' => 30,
            ],
            [
                'name' => 'Limpeza',
                'description' => 'Limpeza de tártaro',
                'price' => 150.00,
                'status' => 'active',
                'duration' => 60,
            ],
            [
                'name' => 'Extração',
                'description' => 'Extração de dente',
                'price' => 200.00,
                'status' => 'active',
                'duration' => 45,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }

    private function createAppointments(): void
    {
        Appointment::factory(100)->create();
    }
}
