<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ZonesController extends Controller
{
	protected $zones;

	public function __construct()
	{
		$this->zones = new \App\Models\Zones();
	}

	public function index()
	{
		return response()->json($this->zones::all());
	}

    public function store(Request $request)
    {
    	$status = false;

    	$this->zones->tested = ($request->tested) ? true : false;
    	$this->zones->existing = ($request->existing) ? true : false;
    	$this->zones->zone_id = $request->zone_id;
    	$this->zones->zone_name = $request->zone_name;
    	$this->zones->event_type = $request->event_type;
    	$this->zones->device_type = $request->device_type;

	    if($this->zones->save())
	    {
		    $status = $this->zones;
	    }

	    return response()->json($status);
    }

    public function destroy($id)
    {
	    return response()->json($this->zones::destroy($id));
    }

    public function show(Request $request)
    {
    	return view('zones.show')->with("zone", $this->zones->find($request->zone_id));
    }
}
