<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends BaseController
{
    public function index() {
        $news = News::with("category")->get();
        return $this->sendResponse(new NewsCollection($news), "News retrieved successfully", 200);
    }
}
