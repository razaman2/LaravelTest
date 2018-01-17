<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use App\Rules\UniqueZone;
use Illuminate\Http\Request;

class ZonesController extends Controller
{
	public function index()
	{
		return response()->json(Zone::all());
	}

    public function save(Request $request)
    {
    	$request->validate([
		    'zone.zone_number' => [new UniqueZone($request->jobId, $request->companyId)]
	    ]);

	    $zone = Zone::updateOrCreate(
		    ['id' => $request->zone['id'] ?? 0],
		    [
			    'company_id' => $request->companyId,
			    'job_id' => $request->jobId,
			    'existing' => $request->zone['existing'],
			    'tested' => $request->zone['tested'],
			    'zone_number' => $request->zone['zone_number'],
			    'zone_name' => $request->zone['zone_name'],
			    'event_type' => $request->zone['event_type'],
			    'device_type' => $request->zone['device_type']
		    ]
	    );

	    return response()->json($zone);
    }

    public function archive(Request $request)
    {
	    return response()->json(Zone::where('id', $request->zone['id'])->delete());
    }

    public function show(Request $request)
    {
    	return response()->json(Zone::where('id', $request->id)->first());
    }
}
