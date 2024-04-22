<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    public function index() {
        $categories = Category::all();
        return $this->sendResponse(new CategoryCollection($categories), "Categories retrieved successfully", 200);
    }
}
