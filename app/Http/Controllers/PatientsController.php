<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $patients = Patient::select('id', 'name', 'email', 'phone')->with('appointments')->paginate(50);

        if ($request->search) {
            $patients = $this->searchPatients($request->search);
        }

        return Inertia::render('Patients/index', [
            'patients' => $patients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Patients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:patients',
            'phone' => 'required|unique:patients',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ], [
            'name.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo email deve ser um email válido.',
            'email.unique' => 'O email informado já está em uso por outro paciente cadastrado.',
            'phone.numeric' => 'O campo telefone deve conter apenas números.',
            'phone.unique' => 'O telefone informado já está em uso por outro paciente cadastrado.',
            'phone.required' => 'O campo telefone é obrigatório.',
            'address.required' => 'O campo endereço é obrigatório.',
            'city.required' => 'O campo cidade é obrigatório.',
            'state.required' => 'O campo estado é obrigatório.',
            'zip.required' => 'O campo CEP é obrigatório.',
        ]);

        Patient::create($request->all());

        return redirect()->route('patients.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $patient = Patient::with('appointments')->with('appointments.user')->with('appointments.service')->find($id);

        return Inertia::render('Patients/show', [
            'patient' => $patient,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $patient = Patient::find($id);
        $patient = $patient->with('appointments')->find($id);
        return Inertia::render('Patients/edit', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:patients,email,' . $id,
            'phone' => 'required|unique:patients,phone,' . $id,
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'zip' => 'required',
        ], [
            'name.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo email deve ser um email válido.',
            'email.unique' => 'O email informado já está em uso por outro paciente cadastrado.',
            'phone.numeric' => 'O campo telefone deve conter apenas números.',
            'phone.unique' => 'O telefone informado já está em uso por outro paciente cadastrado.',
            'phone.required' => 'O campo telefone é obrigatório.',
            'address.required' => 'O campo endereço é obrigatório.',
            'city.required' => 'O campo cidade é obrigatório.',
            'state.required' => 'O campo estado é obrigatório.',
            'zip.required' => 'O campo CEP é obrigatório.',
        ]);

        $patient = Patient::find($id);
        $patient->update($request->all());

        return redirect()->route('patients.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function searchPatients($search)
    {
        return Patient::where('name', 'like', "%$search%")
        ->orWhere('email', 'like', "%$search%")
        ->orWhere('phone', 'like', "%$search%")
        ->with('appointments')
        ->paginate(50);
    }
}
