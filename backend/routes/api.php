<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource("news", NewsController::class);
    Route::get("orderedNews", [NewsController::class, "findNewsByPubOrder"]);
    Route::get("news/category/{categoryName}", [NewsController::class, "findByCategoryName"]);
    Route::get("news/category/{categoryName}/subcategories", [NewsController::class, "findByCategoryAndSubcategories"]);
    Route::post('logout',[AuthController::class,'logout']);
    Route::get("categories", [CategoryController::class, "index"]);
});
Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);



