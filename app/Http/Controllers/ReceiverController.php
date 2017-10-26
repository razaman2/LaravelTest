<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReceiverController extends Controller
{
//    const device = '192.168.1.11/MainZone/index.put.asp';

    public function post()
    {
        $ch = curl_init('razaman2.dyndns.org:81/MainZone/index.put.asp');

        curl_setopt($ch, CURLOPT_POSTFIELDS, 'cmd0=PutSystem_OnStandby/ON&cmd1=aspMainZone_WebUpdateStatus/');

        curl_setopt($ch, CURLOPT_POST, true);

        $response = curl_exec($ch);

        curl_close($ch);

        return response()->json($response);
    }

    public function status()
    {
        $ch = curl_init('http://192.168.1.11/goform/formMainZone_MainZoneXml.xml');

        $response = curl_exec($ch);

        return response()->json($response);
    }

    public function get()
    {
        return $this->post();
    }
}



/**
 * VARIABLE TO STORE THE DELAY TIME BEFORE REQUESTING SYSTEM FEEDBACK
 * @var integer $time
 */
//$time = 0;
//
//switch($_POST['cmd'])
//{
//    case 'on':
//        $cmd = 'cmd0=PutSystem_OnStandby/ON';
//
//        /**
//         * WAIT FOR SYSTEM TO FULLY POWER ON BEFORE REQUESTING FEEDBACK
//         * @var integer $time
//         */
//        $time = 4;
//        break;
//
//    case 'off':
//        $cmd = 'cmd0=PutSystem_OnStandby/STANDBY';
//        break;
//
//    case 'vol_up':
//        $cmd = 'cmd0=PutMasterVolumeBtn/>';
//        break;
//
//    case 'vol_dn':
//        $cmd = 'cmd0=PutMasterVolumeBtn/<';
//        break;
//
//    case 'vol':
//        if($_POST['value'] >= -80.5 && $_POST['value'] <= 18.0)
//        {
//            $cmd = 'cmd0=PutMasterVolumeSet/'.$_POST['value'];
//        }
//        else
//        {
//            die('{"error":"invalid volume, must be between -80.5 & 18.0"}');
//        }
//        break;
//
//    case 'mute':
//        $cmd = 'cmd0=PutVolumeMute/'.$_POST['value'];
//        break;
//
//    case 'surround':
//        if(in_array(strtoupper($_POST['mode']), $surround))
//        {
//            $cmd = 'cmd0=PutSurroundMode/'.$_POST['mode'];
//
//            /**
//             * WAIT FOR SURROUND MODE TO CHANGE BEFORE REQUESTING FEEDBACK
//             * @var integer $time
//             */
//            $time = 2;
//        }
//        else
//        {
//            die('{"error":"invalid surround mode selected"}');
//        }
//        break;
//
//    case 'source':
//        if(in_array(strtoupper($_POST['source']), $source))
//        {
//            $cmd = 'cmd0=PutZone_InputFunction/'.$_POST['source'];
//        }
//        else
//        {
//            die('{"error":"invalid source selected"}');
//        }
//        break;
//
//    case 'status':
//
//}
//
//if($_POST['cmd'] != 'status')
//{
//    Post('razaman2.dyndns.org/MainZone/index.put.asp', $cmd, 'post');
//}
//
///**
// * PAUSE THE CALL TO GET FEEDBACK UNTIL THE SYSTEM HAS FEEDBACK AVAILABLE.
// * SOME FUNCTIONS TAKE TIME TO RETURN FEEDBACK
// */
//sleep($time);
//
//echo Post('razaman2.dyndns.org/goform/formMainZone_MainZoneXml.xml');
//}