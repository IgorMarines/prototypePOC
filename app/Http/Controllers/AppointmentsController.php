<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Appointments/index', [
            'appointments' => Appointment::with('patient', 'user', 'service')->get(),
            'services' => Service::select('id', 'name')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Appointments/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required',
            'user_id' => 'required',
            'service_id' => 'required',
            'date' => 'required',
            'time' => 'required',
            'description' => 'required',
        ], [
            'patient_id.required' => 'O campo paciente é obrigatório e não pode estar vazio',
            'user_id.required' => 'O campo profissional é obrigatório e não pode estar vazio',
            'service_id.required' => 'O campo serviço é obrigatório e não pode estar vazio',
            'date.required' => 'O campo data é obrigatório e não pode estar vazio',
            'time.required' => 'O campo hora é obrigatório e não pode estar vazio',
        ]);

        Appointment::create($request->all());

        return redirect()->route('appointments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Appointments/Show', [
            'appointment' => Appointment::with('patient', 'user', 'service', 'notes')->with('notes.user')
                ->orderBy('created_at', 'desc')
                ->find($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Appointments/Edit', [
            'appointment' => Appointment::with('patient', 'user', 'service')->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'patient_id' => 'required',
            'user_id' => 'required',
            'service_id' => 'required',
            'date' => 'required',
            'time' => 'required',
        ], [
            'patient_id.required' => 'O campo paciente é obrigatório e não pode estar vazio',
            'user_id.required' => 'O campo profissional é obrigatório e não pode estar vazio',
            'service_id.required' => 'O campo serviço é obrigatório e não pode estar vazio',
            'date.required' => 'O campo data é obrigatório e não pode estar vazio',
            'time.required' => 'O campo hora é obrigatório e não pode estar vazio',
        ]);

        Appointment::find($id)->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $appointment = Appointment::find($id);

        $appointment->delete();

        return redirect()->route('appointments.index');
    }

    public function search(Request $request)
    {
        $search = $request->input('search'); // Pegando o valor do input 'search'

        $appointments = Appointment::with('patient', 'user', 'service')
            ->where('date', 'like', "%{$search}%")
        ->orWhereHas('user', function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        })
            ->orWhereHas('patient', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orWhereHas('service', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->get();

        return Inertia::render('Appointments/index', [
            'appointments' => $appointments,
            'services' => Service::select('id', 'name')->get(),
        ]);
    }

    public function searchService(Request $request)
    {
        $service_id = $request->input('service_id');

        if ($service_id == null) {
            return redirect()->route('appointments.index');
        }
        $appointments = Appointment::with('patient', 'user', 'service')
        ->where('service_id', $service_id)
            ->get();

        return Inertia::render('Appointments/index', [
            'appointments' => $appointments,
            'services' => Service::select('id', 'name')->get(),
        ]);
    }

    // update status
    public function updateStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required',
        ], [
            'status.required' => 'O campo status é obrigatório e não pode estar vazio',
        ]);

        Appointment::find($id)->update($request->all());
    }
}
