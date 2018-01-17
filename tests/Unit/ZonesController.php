<?php

namespace Tests\Unit;

use App\Http\Controllers\ZonesController as ZoneControll;
use Illuminate\Http\Request;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ZonesController extends TestCase
{
    public function testCanValidateDuplicateZone()
    {
        $controller = new ZoneControll();
	    $result = $controller->save(new Request([
		    'companyId'=>'000000000000000000',
		    'jobId'=>'2222222222222222222',
		    'zone'=>[
			    'existing'=>true,
			    'tested'=>false,
			    'zone_number'=>'1',
			    'zone_name'=>'basement smoke',
			    'event_type'=>'smk',
			    'device_type'=>'fire',
		    ],
	    ]));
	    return response()->json($result);
    }

    public function testCanGetAllZones()
    {
	    $controller = new ZoneControll();
	    print_r($controller->index());
    }
}
