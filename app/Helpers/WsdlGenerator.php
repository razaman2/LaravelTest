<?php

	namespace App\Helpers;

	use Illuminate\Support\Facades\Storage;
	use PHPExcel_IOFactory;
	use WsdlToPhp\PackageGenerator\ConfigurationReader\GeneratorOptions;
	use WsdlToPhp\PackageGenerator\Generator\Generator;

	class WsdlGenerator
	{
		protected $dirName;
		protected $wsdlUrl;

		public function __construct($directory = 'vendor/generated')
		{
			$options = GeneratorOptions::instance();
			$options
				->setOrigin($this->wsdlUrl)
				->setDestination($directory)
				->setStandalone(false)
				->setNamespace('Wsdl\\'.$this->dirName)
				->setSrcDirname($this->dirName);
			// Generator instanciation
			$generator = new Generator($options);
			// Package generation
			$generator->generatePackage();
			// Update composer.json file
			$file = json_decode(Storage::disk('root')->get('composer.json'), true);
			if(!isset($file['autoload']['psr-4']['Wsdl\\']))
			{
				$file['autoload']['psr-4']['Wsdl\\'] = $directory;
				Storage::disk('root')->put('composer.json', json_encode($file));
			}
			// Rename tutorial file
			Storage::disk('generated')->move('tutorial.php', $this->dirName."Tutorial.php");
		}
	}

	class GenerateMoniWsi extends WsdlGenerator
	{
		protected $dirName = 'MoniWsi';
		protected $wsdlUrl = 'https://mimasweb.monitronics.net/MIDI/MIDI.asmx?wsdl';
	}

	class GenerateAdcCustomerManagement extends WsdlGenerator
	{
		protected $dirName = 'ADC\CustomerManagement';
		protected $wsdlUrl = 'https://alarmadmin.alarm.com/WebServices/CustomerManagement.asmx?wsdl';
	}

	class GenerateMoniContract extends WsdlGenerator
	{
		protected $dirName = 'MoniContract';
		protected $wsdlUrl = 'https://mimasweb.monitronics.net/eContractAPI?wsdl';
	}

	class GenerateMoniFunding extends WsdlGenerator
	{
		protected $dirName = 'MoniFunding';
		protected $wsdlUrl = 'https://mimasweb.monitronics.net/CommonFunding?wsdl';
	}

	class GenerateMoniBounce extends WsdlGenerator
	{
		protected $dirName = 'MoniBounce';
		protected $wsdlUrl = 'https://ws.monitronics.net/BounceServiceR2/wwwBouncer.svc?wsdl';
	}

	class GenerateRapidWeb extends WsdlGenerator
	{
		protected $dirName = 'RapidWeb';
		protected $wsdlUrl = 'https://rapidweb3000.com/StagesGatewayExternalDev145/Gateway.asmx?wsdl';

		public function test()
		{
			$filePath = base_path().'\\ipcameras.xlsx';
			$reader = PHPExcel_IOFactory::createReaderForFile($filePath);
			$file = $reader->load($filePath);
			$worksheet = $file->getActiveSheet();
			$lastRow = $worksheet->getRowIterator()->current()->getCellIterator();
			print_r($file);
//			foreach($file as $key => $value)
//			{
//			}
		}
	}