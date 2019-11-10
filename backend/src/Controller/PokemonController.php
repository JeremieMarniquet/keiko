<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class PokemonController
{
    public function hello()
    {
        return new Response(
            'Hello world'
        );
    }
}
