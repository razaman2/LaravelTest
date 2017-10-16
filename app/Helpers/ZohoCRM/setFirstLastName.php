<?php

	namespace App\Helpers\ZohoCRM;

	trait setFirstLastName
	{
		private function setFirstLastNameFromZoho(&$collection)
		{
			if($collection["Contact Name"])
			{
				$contactName = $collection["Contact Name"];

				$contactName = explode(" ", $contactName);

				if(count($contactName) > 2)
				{
					$firstName = $contactName[1];
					$lastName  = $contactName[2];
				}
				else
				{
					$firstName = $contactName[0];
					$lastName  = $contactName[1];
				}

				$collection["First Name"] = $firstName;
				$collection["Last Name"] = $lastName;
			}
		}

		private function setFirstLastNameToZoho(&$collection)
		{

		}
	}