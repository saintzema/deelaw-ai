<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'tokens',
        'avatar',
        'role',
        'plan',
        'referral_id',
        'company',
        'website',
        'city',
        'country',
        'job_role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'tokens' => 'array',
        'plan' => 'array',
    ];

    // Set default tokens when creating a new user
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (!isset($user->tokens)) {
                $user->tokens = [
                    'words' => 5000,
                    'images' => 0,
                    'minutes' => 5,
                    'characters' => 1000
                ];
            }
        });
    }
}
