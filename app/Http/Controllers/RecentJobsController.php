<?php

namespace App\Http\Controllers;

use App\Models\RecentJobs;
use Illuminate\Http\Request;

class RecentJobsController extends Controller
{
    public function index()
    {
        return response()->json(RecentJobs::paginate(3));
    }

    public function store(Request $request)
    {
	    $job = RecentJobs::updateOrCreate(
		    ['job_id' => $request->Id],
		    [
			    'company_id' => $request->companyId,
			    'job_id' => $request->Id,
			    'first_name' => $request->job['First Name'],
			    'last_name' => $request->job['Last Name']
		    ]
	    );
    	return response()->json($job);
    }

    public function archiveJob(Request $request)
    {
        return response()->json(RecentJobs::where('id', $request->id)->delete());
    }

    public function getArchivedJobs()
    {
    	return response()->json(RecentJobs::onlyTrashed()->paginate(3));
    }

    public function restoreArchivedJob(Request $request)
    {
    	return response()->json(RecentJobs::where('id', $request->id)->restore());
    }

    public function deleteArchivedJob(Request $request)
    {
    	return response()->json(RecentJobs::where('id', $request->id)->forceDelete());
    }
}
