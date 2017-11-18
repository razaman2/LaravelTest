<?php

namespace App\Http\Controllers;

use App\Helpers\WSI\Get;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
	public function index()
	{
		return response()->json(Contact::all());
	}

    public function save(Request $request)
    {
    	return response()->json(Contact::updateOrCreate([
    		'id'=>$request->contact['id'] ?? 0
	    ],[
	    	'company_id'=>$request->companyId,
	    	'job_id'=>$request->jobId,
	    	'enhanced'=>$request->contact['enhanced'],
	    	'has_key'=>$request->contact['has_key'],
	    	'signer'=>$request->contact['signer'],
	    	'first_name'=>$request->contact['first_name'],
	    	'last_name'=>$request->contact['last_name'],
	    	'phone'=>$request->contact['phone'],
	    	'passcode'=>$request->contact['passcode'],
	    	'call_order'=>$request->contact['call_order'],
	    	'relationship'=>$request->contact['relationship'],
	    	'phone_type'=>$request->contact['phone_type'],
	    	'contact_type'=>$request->contact['contact_type'],
	    	'authority_level'=>$request->contact['authority_level'],
	    ]));
    }

    public function archive(Request $request)
    {
    	return response()->json(Contact::where('id', $request->contact['id'])->delete());
    }

    public function contactSelects()
    {
	    return response()->json((new Get())->getContactSelects());
    }
}
