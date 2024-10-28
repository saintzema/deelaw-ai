<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'audio' => 'nullable|file|mimes:wav,mp3,ogg'
        ]);

        // Store user message
        $userMessage = ChatMessage::create([
            'user_id' => $request->user()->id,
            'content' => $request->message,
            'is_user' => true,
        ]);

        try {
            // Get AI response
            $response = OpenAI::chat()->create([
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a legal AI assistant.'],
                    ['role' => 'user', 'content' => $request->message],
                ],
            ]);

            $aiResponse = $response->choices[0]->message->content;

            // Store AI response
            $aiMessage = ChatMessage::create([
                'user_id' => $request->user()->id,
                'content' => $aiResponse,
                'is_user' => false,
            ]);

            // Update user tokens
            $wordsUsed = str_word_count($request->message);
            $user = $request->user();
            $tokens = $user->tokens;
            $tokens['words'] -= $wordsUsed;
            $user->tokens = $tokens;
            $user->save();

            return response()->json([
                'message' => $aiResponse,
                'tokensUsed' => $wordsUsed
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to process message',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
