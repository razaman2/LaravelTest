<?php

	namespace App\Helpers\ZohoCRM;

	trait Conversion
	{
		public function countryIsCanadaFromCrm($data)
		{
			$keys = ["Country", "Mailing Country"];

			foreach($keys as $key)
			{
				try
				{
					if(preg_match("/canada/i", $data[$key]))
					{
						switch($key)
						{
							case "Country":
								$data["State"] = $data["Province"];
								$data["Zip"] = $data["Postal Code"];
//							    $data["Billing State"] = $data["Billing Province"];
//							    $data["Billing Zip"] = $data["Billing Postal Code"];
								break;

							case "Mailing Country":
//								$data["Mailing State"] = $data["Province"];
//							    $data["Mailing Zip"] = $data["Postal Code"];
								break;
						}
					}
				}
				catch(\Exception $e){}
			}

			return $data;
		}

		public function countryIsCanadaToCrm()
		{

		}

		protected function convertFromString($data)
		{
			foreach($data as $key => $value)
			{
				switch($value)
				{
					case "true":
						$data[$key] = true;
						break;

					case "false":
						$data[$key] = false;
						break;

					case "null":
						if($key !== "Alarm Network"){
							$data[$key] = null;
						}
						else{
							$data[$key] = "None";
						}
						break;
				}
			}

			return $data;
		}

		protected function convertToString($data)
		{
			foreach($data as $key => $value)
			{
				switch($value)
				{
					case $value === "":
						$data[$key] = "";
						break;

					case $value === "None":
						$data[$key] = null;
						break;

					case $value === true:
						$data[$key] = "true";
						break;

					case $value === false:
						$data[$key] = "false";
						break;

					case $value === null:
						$data[$key] = "";
						break;
				}
			}

			return $data;
		}

		protected function convertToNoneFromZoho($fields)
		{
			foreach($fields as $field)
			{
				if($field->type === "Pick List")
				{
					foreach($field->options as $key => $value)
					{
						if($value === "-None-")
						{
							$field->options[$key] = "None";
						}
					}
				}
			}

			return $fields;
		}

		protected function convertCurrency($data)
		{
			$fields = ["RMR", "Amount", "Activation Fee"];

			foreach($fields as $field)
			{
				$data[$field] = number_format((float)$data[$field], 2, '.', '');
			}

			return $data;
		}

		protected function convertCountryFromZoho($data)
		{
			return preg_replace("/[^A-Za-z]/", "", $data);
		}

		protected function convertCountryToZoho($data)
		{
			if(preg_match("/usa/i", $data))
				return "U.S.A";
			else
				return $data;
		}
	}