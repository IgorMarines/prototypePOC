<?php

use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\CreateAppointmentNote;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\ServiceController;
use App\Models\Appointment;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Appointments/index', ["appointments" => Appointment::with("patient", "user", "service")->get()]);
    return redirect('/appointments');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('roles', RolesController::class);

Route::get('/appointments/search', [AppointmentsController::class, 'search'])->name('appointments.search');
Route::get('/appointments/searchService', [AppointmentsController::class, 'searchService'])->name('appointments.searchService');
Route::patch('/appointments/{id}/updateStatus', [AppointmentsController::class, 'updateStatus'])->name('appointments.updateStatus');
Route::resource('appointments', AppointmentsController::class);

Route::resource('patients', PatientsController::class);

Route::post('/appointmentsNotes/create', CreateAppointmentNote::class)->name('appointments.notes.store');

Route::resource('services', ServiceController::class);

require __DIR__ . '/auth.php';
