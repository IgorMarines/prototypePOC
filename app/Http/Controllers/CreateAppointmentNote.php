<?php

namespace App\Http\Controllers;

use App\Models\AppointmentNotes;
use Illuminate\Http\Request;

class CreateAppointmentNote extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'appointment_id' => 'required',
            'user_id' => 'required',
            'notes' => 'required',
        ], [
            'appointment_id.required' => 'O campo agendamento é obrigatório e não pode estar vazio',
            'user_id.required' => 'O campo profissional é obrigatório e não pode estar vazio',
            'notes.required' => 'O campo anotação é obrigatório e não pode estar vazio',
        ]);

        AppointmentNotes::create($request->all());

        return redirect()->route('appointments.show', ['appointment' => $request->appointment_id]);
    }
}
