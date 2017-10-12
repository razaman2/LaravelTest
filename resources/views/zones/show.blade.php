@extends('layouts.app')

@section('content')
    <a href="/zones">
        <input type="button" value="<< Back">
    </a>
    <div>
        {{$zone}}
    </div>
@endsection