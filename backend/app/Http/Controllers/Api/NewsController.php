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
        $validated = $request->validated();
        $news = News::create($validated);
        return $this->sendResponse(new NewsResource($news), "News created successfully", 201);
    }

    public function show(Request $request, News $news) {
        die("here");
        try {
        if (is_null($news)) {
            die("here");
            return $this->sendError("News not found");
        }
        die("here");

        $news->load('category');
        return $this->sendResponse(new NewsResource($news), "News retrieved successfully", 200);
    } catch (ModelNotFoundException $e) {
        die("here");
        return $this->sendError("News not found");
    }
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
