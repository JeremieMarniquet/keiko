<?php

namespace App\Controller;

use App\Entity\Pokemon;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class PokemonController
{
    private $normalizer;
    private $entityManager;

    public function __construct(
      NormalizerInterface $normalizer,
      EntityManagerInterface $entityManager,
      SerializerInterface $serializer
    ) {
        $this->normalizer = $normalizer;
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
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
        $pokemon = $this->serializer->deserialize($request->getContent(), Pokemon::class, 'json');

        $this->entityManager->persist($pokemon);
        $this->entityManager->flush();

        // Return the created pokemon in the response
        return new JsonResponse($this->normalizer->normalize($pokemon, 'json'));
    }
}
