<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RecentJobs extends Model
{
    use SoftDeletes;

    protected $fillable = ['first_name', 'last_name', 'company_id', 'job_id'];

    public function getCreatedAtAttribute($value)
    {
        return (new Carbon($value))->diffForHumans();
    }

    public function getUpdatedAtAttribute($value)
    {
        return (new Carbon($value))->diffForHumans();
    }

	public function getFirstNameAttribute($value)
	{
		return ucfirst($value);
	}

	public function getLastNameAttribute($value)
	{
		return ucfirst($value);
	}
}
