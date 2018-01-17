<?php

namespace Tests\Unit;

use function fgets;
use function fopen;
use GuzzleHttp\Psr7\Request;
use PHPExcel_IOFactory;
use function print_r;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PhpExcel extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
		$filePath = base_path().'\\pht_cs_numbers.xlsx';
//		$filePath = base_path().'\\ipcameras.xlsx';
		$reader = PHPExcel_IOFactory::createReaderForFile($filePath);
		$file = $reader->load($filePath);
		$worksheet = $file->getActiveSheet();
//		$lastRow = $worksheet->getRowIterator()->current()->getCellIterator();
//		print_r($worksheet->getCell('E10')->getValue());
//		$data = $worksheet->getRowIterator(1, 54)->current()->getCellIterator('A', 'N');
//		$pht_cs = collect($worksheet->toArray('roll'));
//		$header = $pht_cs->filter(function($item){
//			return collect($item)->every(function($item)
//			{
//				return $item !== 'roll';
//			});
//		})->first();

		$cs_numbers = collect($worksheet->toArray())
			->filter(function($item)
			{
				return intval(preg_match('/^\d{9}$/', $item[1]));
			})
			->map(function($item)
			{
				return ['cs'=>$item[1], 'rec'=>$item[4]];
			});

			collect($cs_numbers)->each(function($item){
				$response = (new Request('POST', 'http://174.138.40.228/api/company/get',[], 'id=2144870000000459009'));
//				print_r($response);
			});

//		print_r($header);
//		print_r($cs_numbers);
//		foreach($rows as $key => $val)
//		{
//			print_r($val->getCell());
//		}
//		$handle = fopen($filePath,'rb');
////		$contents = fread($handle, 1024);
//		$contents = fgets($handle);
//
//		print_r($contents);

		self::assertTrue(true);
    }
}
