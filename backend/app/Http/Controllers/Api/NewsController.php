<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class NewsController extends BaseController
{
    public function index() {
        $news = News::with("category")->get();
        return $this->sendResponse(new NewsCollection($news), "News retrieved successfully", 200);
    }

    public function store(StoreNewsRequest $request) {
        $data = $request->validated();
        $news = News::create($data);
        return $this->sendResponse(new NewsResource($news), "News created successfully", 201);
    }

    public function show(Request $request, News $news) {
        if (is_null($news)) {
            return $this->sendError("News not found");
        }
        $news->load('category');
        return $this->sendResponse(new NewsResource($news), "News retrieved successfully", 200);
    }

    public function update(UpdateNewsRequest $request, News $news) {
        $validated = $request->validated();
        $news->update($validated);
        return $this->sendResponse(new NewsResource($news), "News updated successfully", 200);
    }

    public function destroy(News $news) {
        $news->delete();
        return $this->sendResponse([], "News deleted successfully", 204);
    }
}
