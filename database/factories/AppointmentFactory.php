<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $patient = \App\Models\Patient::factory()->create();
        $user = \App\Models\User::factory()->create();

        $status = $this->faker->randomElement(['scheduled', 'canceled', 'completed', 'pending_contact', 'done', 'results_done', 'pending_results', 'interrupted']);

        $randomService = Service::get()->random();
        return [
            'patient_id' => $patient->id,
            'user_id' => $user->id,
            'date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'service_id' => $randomService->id,
            'description' => $this->faker->sentence,
            'status' => $status,
        ];
    }
}
