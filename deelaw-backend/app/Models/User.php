<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
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

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'tokens' => 'array',
        'plan' => 'array',
    ];

    /**
     * Boot the model and set default values for tokens.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (is_null($user->tokens)) {
                $user->tokens = [
                    'words' => 5000,
                    'images' => 0,
                    'minutes' => 5,
                    'characters' => 1000
                ];
            }
        });
    }

    /**
     * Accessor for the tokens attribute to ensure it's always an array.
     *
     * @return array
     */
    public function getTokensAttribute($value)
    {
        return is_array($value) ? $value : json_decode($value, true) ?? [];
    }

    /**
     * Mutator for the tokens attribute to ensure it's saved as JSON.
     *
     * @param array $value
     */
    public function setTokensAttribute(array $value)
    {
        $this->attributes['tokens'] = json_encode($value);
    }
}