<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    public function recentJob()
    {
    	return $this->belongsTo(RecentJobs::class);
    }
}
