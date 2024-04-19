<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "content",
        "category_id",
        "debut_date",
        "expiration_date"
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
