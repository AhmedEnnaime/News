<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    public function register(Request $request){
        $registerUserData = $request->validate([
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|min:8'
        ]);
        $user = User::create([
            'name' => $registerUserData['name'],
            'email' => $registerUserData['email'],
            'password' => Hash::make($registerUserData['password']),
        ]);
        return $this->sendResponse($user, "User registered successfully", 201);
    }

    public function login(Request $request){
        $loginUserData = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|min:8'
        ]);
        $user = User::where('email',$loginUserData['email'])->first();
        if(!$user || !Hash::check($loginUserData['password'],$user->password)){
            return $this->sendError('Invalid credentials.', ['error' => 'Email or password invalid'], 401);
        }
        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
        $success["access_token"] = $token;
        return $this->sendResponse($success, "User logged in successfully", 200);
    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return response()->json([
        "message"=>"logged out"
        ]);
    }
}
