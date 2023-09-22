<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class StarshipController extends Controller
{

    private $apiEndpointBase = "http://swapi.dev/api";

    public function getAllStarships() {
        $response = Http::withoutVerifying()->get($this->apiEndpointBase . "/starships/");
        if($response->failed()) {
            return response("There has been server error. Please try again later.", $response->status());
        }
        return $response->json();
    }

    public function findStarships(Request $request) {
        $response = Http::withoutVerifying()->get($this->apiEndpointBase . "/starships/");
        if($response->failed()) {
            return response("There has been server error. Please try again later.", $response->status());
        }
        $class = "";
        $cost = 0;
        if(isset($request['starshipClass'])) {
            $class = $request['starshipClass'];
        }
        if(isset($request['starshipCost'])) {
            $cost = $request['starshipCost'];
        }

        $filteredResponse = array_filter($response->json()['results'], function($ship) use ($class, $cost) {
            return str_contains($ship['starship_class'], $class) && str_contains($ship['cost_in_credits'], $cost);
        });

        return $filteredResponse;
    }
}
