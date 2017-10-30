<?php

namespace App\Rules;

use App\Models\Zone;
use Illuminate\Contracts\Validation\Rule;

class UniqueZone implements Rule
{
	protected $jobId;
	protected $companyId;

    public function __construct($jobId, $companyId)
    {
        $this->jobId = $jobId;
        $this->companyId = $companyId;
    }

    public function passes($attribute, $value)
    {
	    return Zone::whereExists(function($query) use ($value) {
		    $query->where('job_id', $this->jobId)
			    ->where('company_id', $this->companyId)
			    ->where('zone_number', value($value));
	    })->get()->count() ? false : true;
    }

    public function message()
    {
        return 'This zone already exists for this job';
    }
}
