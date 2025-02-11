<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentNotes extends Model
{
    protected $fillable = [
        'appointment_id',
        'user_id',
        'notes',
    ];

    protected $table = 'appointment_notes';

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
