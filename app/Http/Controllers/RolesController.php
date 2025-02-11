<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Roles/index', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Roles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'O campo nome é obrigatório.',
            ]
        );

        Role::create([
            'name' => $request->name,
            'description' => $request->description,
            'slug' => substr($request->name, 0, 4),
        ]);

        return redirect()->route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('Roles/show', [
            'role' => Role::find($id),
            'users' => User::where('role_id', $id)->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Roles/edit', [
            'role' => Role::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'O campo nome é obrigatório.',
            ]
        );

        $role = Role::find($id);
        $role->update($request->all());
        return redirect()->route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $users = User::where('role_id', $id)->get();
        foreach ($users as $user) {
            $user->update(['role_id' => null]);
        }

        Role::destroy($id);
        return redirect()->route('roles.index');
    }
}
