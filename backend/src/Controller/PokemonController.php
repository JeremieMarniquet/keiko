<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PokemonController
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    /**
     * @Route("/api/pokemon", methods={"GET"})
     */
    public function get()
    {
        $pokemon = new Pokemon();
        $pokemon->setName('Pikachu');
        $pokemon->setHeight(10);
        $pokemon->setWeight(10);

        $content = $this->normalizer->normalize($pokemon, 'json');

        return new JsonResponse($content);
    }

    /**
     * @Route("api/pokemon", methods={"POST"})
     */
    public function post()
    {
        return new Response('Hello World');
    }
}
