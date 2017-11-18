<?php

	namespace App\Helpers\WSI;

	use Wsdl\MoniWsi\ClassMap;
	use WsdlToPhp\PackageBase\AbstractSoapClientBase;

	class Base
	{
		protected $options;
		protected $username;
		protected $password;
		protected $csNumber;
		protected $xmlData;

		public function __construct()
		{
			$this->options = [
				AbstractSoapClientBase::WSDL_URL => env('WSI_URL').'?wsdl',
				AbstractSoapClientBase::WSDL_LOCATION => env('WSI_URL'),
				AbstractSoapClientBase::WSDL_CLASSMAP => ClassMap::get(),
			];

			$this->getCredentials();
		}

		protected function getCredentials()
		{
			$this->username = env('WSI_USERNAME');
			$this->password = env('WSI_PASSWORD');
			$this->dealerId = env('WSI_DEALER_ID');
		}
	}