<?php

namespace App\Controller;

use App\Entity\Pokemon;
use App\Service\PokemonService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class PokemonController
{
    private $normalizer;
    private $serializer;
    private $pokemonService;

    public function __construct(
      NormalizerInterface $normalizer,
      SerializerInterface $serializer,
      PokemonService $pokemonService
    ) {
        $this->normalizer = $normalizer;
        $this->serializer = $serializer;
        $this->pokemonService = $pokemonService;
    }

    /**
     * @Route("/api/pokemon", methods={"GET"})
     */
    public function list()
    {
        // Retrieve the pokemons
        $repository = $this->entityManager->getRepository(Pokemon::class);
        $pokemons = $repository->findAll();

        // Serialize
        $response = $this->normalizer->normalize($pokemons, 'json');

        return new JsonResponse($response);
    }

    /**
     * @Route("/api/pokemon/{id}", methods={"GET"})
     */
    public function get(string $id)
    {
        // Retrieve the pokemon based on id
        $repository = $this->entityManager->getRepository(Pokemon::class);
        $pokemon = $repository->findOneById($id);

        // Serialize
        $response = $this->normalizer->normalize($pokemon, 'json');

        return new JsonResponse($response);
    }

    /**
     * @Route("api/pokemon", methods={"POST"})
     */
    public function create(Request $request)
    {
        $data = $this->serializer->deserialize($request->getContent(), Pokemon::class, 'json');
        $pokemon = $this->pokemonService->create($data);

        // Return the created pokemon in the response
        return new JsonResponse($this->normalizer->normalize($pokemon, 'json'));
    }
}
