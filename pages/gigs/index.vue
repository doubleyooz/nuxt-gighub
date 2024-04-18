<template>
  <div class="flex flex-col gap-4 max-w-96">
    <gig-card v-for="(item, index) in gigs" :key="index" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
// Function to generate a random set of preferred technologies
function generateRandomTechnologies() {
  const sampleTechnologies = [
    "JavaScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Python",
    "Vue.js",
    "Angular",
    "Java",
    "Swift",
    "Ruby",
    "PHP",
    "Express.js",
    "Django",
    "Spring",
    "Laravel",
    "Bootstrap",
  ];
  const randomTechnologies = [];
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * sampleTechnologies.length);
    randomTechnologies.push(sampleTechnologies[randomIndex]);
  }
  return randomTechnologies;
}

// Populating gigs with ten different items
const gigs = [
  {
    title: "title",
    description: "description",
    createdAt: new Date(),
    budget: 400,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Web",
  },
  {
    title: "another title",
    description:
      "According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:",
    createdAt: new Date(),
    budget: 500,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Mobile",
  },
  {
    title: "one more title",
    description: "one more description",
    createdAt: new Date(),
    budget: 600,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Desktop",
  },
  {
    title: "yet another title",
    description: "yet another description",
    createdAt: new Date(),
    budget: 700,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Web",
  },
  {
    title: "title number five",
    description: "description number five",
    createdAt: new Date(),
    budget: 800,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Mobile",
  },
  {
    title: "the sixth title",
    description: "the sixth description",
    createdAt: new Date(),
    budget: 900,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Desktop",
  },
  {
    title: "seventh title",
    description: "seventh description",
    createdAt: new Date(),
    budget: 1000,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Embedded",
  },
  {
    title: "lucky number eight title",
    description: "lucky number eight description",
    createdAt: new Date(),
    budget: 1100,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Web",
  },
  {
    title: "ninth title",
    description: "ninth description",
    createdAt: new Date(),
    budget: 1200,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Mobile",
  },
  {
    title: "title number ten",
    description: "description number ten",
    createdAt: new Date(),
    budget: 1300,
    preferredTechnologies: generateRandomTechnologies(),
    type: "Desktop",
  },
];
</script>
