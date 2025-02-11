<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Services/index', ["services" => Service::all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::find($id);

        $appointments = Appointment::where('service_id', $id)->with('patient', 'user')->get();
        $serviceData = [
            'appointmentsQtde' => $appointments->count(),
            'valueEarned' => $appointments->count() * $service->price,
            'appointments' => $appointments,
        ];

        return Inertia::render('Services/show', ["service" => Service::find($id), 'serviceData' => $serviceData]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Services/edit', ["service" => Service::find($id)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'duration' => 'required',
            'description' => 'required',
            'status' => 'required',
        ], [
            'name.required' => 'O campo nome é obrigatório',
            'price.required' => 'O campo preço é obrigatório',
            'duration.required' => 'O campo duração é obrigatório',
            'description.required' => 'O campo descrição é obrigatório',
            'status.required' => 'O campo status é obrigatório',
        ]);
        $service = Service::find($id);

        $service->update($request->all());

        return redirect()->route('services.index')->with('success', 'Serviço atualizado com sucesso!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
