<?php

	namespace App\Helpers\ZohoCRM;

	use CristianPontes\ZohoCRMClient\ZohoCRMClient;

	abstract class AbstractZoho
	{
		use Conversion;

		protected $module;
		protected $moduleName;
		protected $zohoApi;
		const dateTimeFormat = '%Y-%m-%d %H:%M:%S';

		public function __construct($companyId)
		{
			$zohoUser = '5b69810dc50fa3a7d24aeafdd2b738a3';

			$this->zohoApi = new ZohoCRMClient($this->moduleName, $zohoUser);
		}

		protected function changeArrayKey($keys, &$array)
		{
			foreach($keys as $replace => $with)
			{
				foreach($array as $key => $value)
				{
					if($key === $replace)
					{
						$array[$with] = $value;
						unset($array[$replace]);
					}
				}
			}

			return $array;
		}
	}