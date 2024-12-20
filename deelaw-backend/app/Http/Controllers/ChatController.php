<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use App\Models\User; // Assuming you have a User model
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'audio' => 'nullable|file|mimes:wav,mp3,ogg'
        ]);

        $userId = $request->user()->id;

        // Store user message
        $userMessage = ChatMessage::create([
            'user_id' => $userId,
            'content' => $request->message,
            'is_user' => true,
        ]);

        try {
            // Prepare messages for OpenAI
            $messages = [
                ['role' => 'system', 'content' => 'You are a legal AI assistant.'],
                ['role' => 'user', 'content' => $request->message],
            ];

            // Handle audio if present
            if ($request->hasFile('audio')) {
                $audio = $request->file('audio');
                $path = $audio->store('audio', 'public');
                $audioContent = $this->transcribeAudio($path);
                
                if ($audioContent) {
                    $messages[] = ['role' => 'user', 'content' => $audioContent];
                }
            }

            // Get AI response
            $response = OpenAI::chat()->create([
                'model' => 'gpt-4',
                'messages' => $messages,
            ]);

            $aiResponse = $response->choices[0]->message->content;

            // Store AI response
            $aiMessage = ChatMessage::create([
                'user_id' => $userId,
                'content' => $aiResponse,
                'is_user' => false,
            ]);

            // Calculate tokens used
            $wordsUsed = str_word_count($request->message);
            $user = $request->user();
            $tokens = $user->tokens;
            $tokens['words'] -= $wordsUsed;
            $user->tokens = $tokens;
            $user->save();

            return response()->json([
                'message' => $aiResponse,
                'tokensUsed' => $wordsUsed,
                'audioUrl' => $request->hasFile('audio') ? Storage::url($path) : null
            ]);

        } catch (\Exception $e) {
            Log::error('ChatController::sendMessage error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to process message',
                'error' => 'An error occurred while processing your request.'
            ], 500);
        }
    }

    /**
     * Transcribe audio file to text
     *
     * @param string $path The path to the audio file
     * @return string|null The transcribed text or null if transcription failed
     */
    private function transcribeAudio(string $path): ?string
    {
        try {
            $audioContent = Storage::get('public/' . $path);
            $transcription = OpenAI::audio()->transcribe([
                'file' => $audioContent,
                'model' => 'whisper-1',
            ]);
            return $transcription->text;
        } catch (\Exception $e) {
            Log::error('ChatController::transcribeAudio error: ' . $e->getMessage());
            return null;
        }
    }
}