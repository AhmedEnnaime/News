<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsCollection;
use App\Http\Resources\NewsResource;
use App\Models\Category;
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
        return $this->sendResponse([
            "message" => "News deleted successfully",
            "deletedElementIdentifier" => $news->id
        ], "News deleted successfully", 200);
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

    public function findByCategoryAndSubcategories($categoryName)
    {
        $category = Category::where('name', $categoryName)->first();

        if (!$category) {
            return $this->sendError("Category not found", [], 404);
        }

        $categoryIds = $this->getIdsOfCategoryAndSubcategories($category);

        $today = Carbon::now()->toDateString();
        $news = News::with("category")
            ->whereIn('category_id', $categoryIds)
            ->where('expiration_date', '>=', $today)
            ->orderBy('debut_date', 'asc')
            ->get();

        return $this->sendResponse(new NewsCollection($news), "News retrieved successfully by category and its subcategories", 200);
    }

    private function getIdsOfCategoryAndSubcategories($category)
    {
        $categoryIds = [$category->id];

        foreach ($category->children as $child) {
            $categoryIds = array_merge($categoryIds, $this->getIdsOfCategoryAndSubcategories($child));
        }

        return $categoryIds;
    }

}
