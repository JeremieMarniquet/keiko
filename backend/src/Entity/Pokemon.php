<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"from_pokemon"}}
 * )
 * @ORM\Table(name="pokemon")
 * @ORM\Entity()
 */
class Pokemon
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"from_pokemon"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotNull
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotNull
     * @Assert\GreaterThan(0)
     * @Groups({"from_pokemon"})
     */
    private $weight;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotNull
     * @Assert\GreaterThan(0)
     * @Groups({"from_pokemon"})
     */
    private $height;

    /**
     * @ORM\ManyToMany(targetEntity="Ability")
     * @Groups({"from_pokemon"})
     *
     * @var ArrayCollection
     */
    private $abilities;

    public function __construct()
    {
        $this->abilities = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getHeight()
    {
        return $this->height;
    }

    /**
     * @param mixed $height
     */
    public function setHeight($height): void
    {
        $this->height = $height;
    }

    /**
     * @return mixed
     */
    public function getWeight()
    {
        return $this->weight;
    }

    /**
     * @param mixed $weight
     */
    public function setWeight($weight): void
    {
        $this->weight = $weight;
    }

    public function getAbilities()
    {
        return $this->abilities;
    }

    public function setAbilities($abilities)
    {
        $this->abilities = $abilities;
    }

    public function addAbility($ability)
    {
        array_push($this->abilities, $ability);
    }
}
