<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\News;
use Carbon\Carbon;
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

    public function findNewsByPubOrder()
    {
        $today = Carbon::now()->toDateString();
        $news = News::with('category')
            ->where('expiration_date', '>=', $today)
            ->orderBy('debut_date', 'asc')
            ->get();

        return $this->sendResponse(new NewsCollection($news), 'Eroding news retrieved successfully', 200);
    }

    public function findByCategoryName($categoryName) {
        $today = Carbon::now()->toDateString();
        $news = News::with("category")
                    ->whereHas('category', function ($query) use ($categoryName) {
                        $query->where('name', $categoryName);
                    })
                    ->where('expiration_date', '>=', $today)
                    ->orderBy('debut_date', 'asc')
                    ->get();
        return $this->sendResponse(new NewsCollection($news), "News retrieved successfully by category name", 200);
    }
}
