<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('resend-verification', [AuthController::class, 'resendVerification']);
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('chat')->group(function () {
        Route::post('send', [ChatController::class, 'sendMessage']);
        Route::post('transcribe', [ChatController::class, 'transcribeAudio']);
    });
});
