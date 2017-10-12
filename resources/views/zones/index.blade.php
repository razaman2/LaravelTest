@extends('layouts.app')

@section('content')
    <div>{{(isset($status)) ? $status : "?"}}</div>
    <form action="/zones/create" method="post">
        {!! csrf_field() !!}
        <input type="checkbox" name="tested">
        <input type="checkbox" name="existing">
        <input type="number" name="zone_id">
        <input type="text" name="zone_name">
        <select name="event_type" id="event_type">
            <option value="Burglary">Burglary</option>
            <option value="Fire">Fire</option>
            <option value="Silent Panic">Silent Panic</option>
            <option value="Audible Panic">Audible Panic</option>
        </select>
        <select name="device_type" id="device_type">
            <option value="DSR">Door</option>
            <option value="WSR">Window</option>
        </select>
        <input type="submit">
    </form>
    <div>
        @foreach($zones as $zone)
            <a href="/zones/show/{{$zone->id}}"><input type="button" class="zone_select" value="Select{{$zone->zone_id}}"></a>
            <div class="zone">
                <ul>
                    @foreach($zone_elements as $zone_element)
                        <li>{{$zone_element}}</li>
                    @endforeach
                </ul>
            </div>
        @endforeach
    </div>
@endsection