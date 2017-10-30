<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zone extends Model
{
    use SoftDeletes;

    protected $guarded = [];

	public function getCreatedAtAttribute($value)
	{
		return (new Carbon($value))->diffForHumans();
	}

	public function getUpdatedAtAttribute($value)
	{
		return (new Carbon($value))->diffForHumans();
	}
}
