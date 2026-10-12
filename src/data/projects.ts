export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  title: string;
  category: "Interior Design" | "Architecture" | "3D Visualization" | "Technical Drawings";
  kind: string;
  number: string;
  overview: string;
  concept: string;
  cover: ProjectImage;
  preview: ProjectImage;
  gallery: ProjectImage[];
  services: string[];
  location?: string;
  year?: number;
  status?: string;
  technicalDrawings?: ProjectImage[];
  materialBoard?: ProjectImage[];
  beforeAfter?: { before: ProjectImage; after: ProjectImage };
};

export const projects: Project[] = [
  {
    slug: "cafe-khemisset",
    title: "Café Khémisset",
    category: "Interior Design",
    kind: "Hospitality",
    number: "01",
    overview:
      "A warm hospitality space where Moroccan craftsmanship meets a contemporary interior.",
    concept:
      "Zellige, carved wood and traditional lanterns create a welcoming atmosphere, with a rich material palette and considered lighting.",
    cover: {
      src: "/assets/cafe-khemisset/01.png",
      alt: "Vue générale du Café Khémisset",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/cafe-thumbnail.webp",
      alt: "Vue générale du Café Khémisset",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/cafe-khemisset/01.png",
        alt: "Vue générale du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/02.png",
        alt: "Espace lounge du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/03.png",
        alt: "Salle du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/04.png",
        alt: "Comptoir du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/05.png",
        alt: "Entrée et réception du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/06.png",
        alt: "Scène et escalier du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/07.png",
        alt: "Tables et assises du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/08.png",
        alt: "Mezzanine du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/09.png",
        alt: "Espace intérieur du Café Khémisset",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-khemisset/10.png",
        alt: "Vue panoramique du Café Khémisset",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
    location: "Khémisset, Morocco",
  },
  {
    slug: "villa-contemporaine",
    title: "Villa contemporaine",
    category: "Architecture",
    kind: "Residential architecture",
    number: "02",
    overview:
      "A personal study of contemporary residential architecture, exploring volumes, daylight and a generous relationship with the garden.",
    concept:
      "Clear architectural lines, mineral materials and planting frame a home that opens to its surroundings. Light and shadow give the facade its rhythm.",
    cover: {
      src: "/assets/villa-contemporaine/facade-principale.png",
      alt: "Façade de la villa contemporaine",
      width: 1448,
      height: 1086,
    },
    preview: {
      src: "/assets/thumbnails/villa-thumbnail.webp",
      alt: "Façade de la villa contemporaine",
      width: 1000,
      height: 750,
    },
    gallery: [
      {
        src: "/assets/villa-contemporaine/facade-principale.png",
        alt: "Façade de la villa contemporaine",
        width: 1448,
        height: 1086,
      },
      {
        src: "/assets/villa-contemporaine/vue-aerienne.png",
        alt: "Vue aérienne de la villa contemporaine",
        width: 1448,
        height: 1086,
      },
      {
        src: "/assets/villa-contemporaine/vue-facade.png",
        alt: "Deuxième vue de la façade de la villa",
        width: 1152,
        height: 864,
      },
    ],
    services: ["3D visualization", "Architectural study"],
    status: "Personal study · Concept",
  },
  {
    slug: "parapharmacie-sale",
    title: "Parapharmacie Salé",
    category: "Interior Design",
    kind: "Retail",
    number: "03",
    overview:
      "A bright contemporary retail space, designed for a clear, comfortable and reassuring shopping experience.",
    concept:
      "Clean lines, glass, wood and restrained metallic details give the product displays clarity and the interior a composed identity.",
    cover: {
      src: "/assets/parapharmacie-sale/01.jpg",
      alt: "Vue intérieure de la Parapharmacie Salé",
      width: 1020,
      height: 1280,
    },
    preview: {
      src: "/assets/thumbnails/parapharmacie-thumbnail.webp",
      alt: "Vue intérieure de la Parapharmacie Salé",
      width: 637,
      height: 800,
    },
    gallery: [
      {
        src: "/assets/parapharmacie-sale/01.jpg",
        alt: "Vue intérieure de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/02.jpg",
        alt: "Entrée de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/03.jpg",
        alt: "Présentoirs de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/04.jpg",
        alt: "Circulation intérieure de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/05.jpg",
        alt: "Façade de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/06.jpg",
        alt: "Vue détaillée des présentoirs",
        width: 1020,
        height: 1280,
      },
      {
        src: "/assets/parapharmacie-sale/07.jpg",
        alt: "Mobilier sur mesure de la Parapharmacie Salé",
        width: 1020,
        height: 1280,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
    location: "Salé, Morocco",
  },
  {
    slug: "villa",
    title: "Villa",
    category: "Interior Design",
    kind: "Residential interior",
    number: "04",
    overview:
      "A luminous residential interior combining contemporary lines, wood, stone and soft lighting.",
    concept:
      "Open spaces, natural tones and carefully placed lighting form an interior organised around comfort and light.",
    cover: {
      src: "/assets/villa/01.webp",
      alt: "Séjour de la villa ouvert sur le jardin et la piscine",
      width: 1536,
      height: 1024,
    },
    preview: {
      src: "/assets/thumbnails/villa-interior-thumbnail.webp",
      alt: "Séjour de la villa ouvert sur le jardin et la piscine",
      width: 1000,
      height: 667,
    },
    gallery: [
      {
        src: "/assets/villa/01.webp",
        alt: "Séjour de la villa ouvert sur le jardin et la piscine",
        width: 1536,
        height: 1024,
      },
      {
        src: "/assets/villa/02.webp",
        alt: "Salon de la villa face au jardin",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/villa/03.webp",
        alt: "Salon avec canapé d'angle et escalier",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/villa/04.webp",
        alt: "Escalier éclairé et espace salon",
        width: 1668,
        height: 943,
      },
      {
        src: "/assets/villa/05.webp",
        alt: "Salle à manger ouverte sur le jardin",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/villa/06.webp",
        alt: "Salle à manger et vue vers la cuisine",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/villa/07.webp",
        alt: "Cuisine avec îlot et finitions en bois",
        width: 1672,
        height: 940,
      },
      {
        src: "/assets/villa/08.webp",
        alt: "Chambre avec tête de lit végétale et éclairage chaleureux",
        width: 1448,
        height: 1086,
      },
      {
        src: "/assets/villa/09.webp",
        alt: "Mur de télévision aux panneaux en bois dans la chambre",
        width: 1254,
        height: 1254,
      },
      {
        src: "/assets/villa/10.webp",
        alt: "Salle de bain avec douche vitrée",
        width: 1265,
        height: 1243,
      },
      {
        src: "/assets/villa/11.webp",
        alt: "Salle de bain avec baignoire et miroir éclairé",
        width: 1234,
        height: 1274,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "appartement",
    title: "Appartement",
    category: "Interior Design",
    kind: "Residential interior",
    number: "05",
    overview:
      "Four spaces from the same apartment: the hall, the parents’ bedroom, the daughter’s bedroom and the terrace.",
    concept:
      "A sequence of connected residential spaces, presented through visualizations that explore each room’s layout and atmosphere.",
    cover: {
      src: "/assets/appartement/hall-001.webp",
      alt: "Vue générale du hall et de ses assises",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/appartement-thumbnail.webp",
      alt: "Vue générale du hall et de ses assises",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/appartement/hall-001.webp",
        alt: "Vue générale du hall et de ses assises",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/hall-002.webp",
        alt: "Hall et espace de réception, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/hall-003.webp",
        alt: "Hall et espace de réception, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/hall-004.webp",
        alt: "Hall et espace de réception, quatrième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/hall-005.webp",
        alt: "Hall avec banquettes et tables basses",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/parents-001.webp",
        alt: "Chambre des parents avec tête de lit en bois",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/parents-002.webp",
        alt: "Chambre des parents, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/parents-003.webp",
        alt: "Chambre des parents, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/fille-001.webp",
        alt: "Chambre de la fille aux tons roses",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/fille-002.webp",
        alt: "Chambre de la fille, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/fille-003.webp",
        alt: "Chambre de la fille, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/terrasse-001.webp",
        alt: "Terrasse avec assises colorées et suspensions tressées",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement/terrasse-002.webp",
        alt: "Terrasse avec pergola et végétation",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "cafe-brunch",
    title: "Café Brunch",
    category: "Interior Design",
    kind: "Hospitality",
    number: "06",
    overview:
      "A brunch café in soft colours, with dining spaces arranged across a ground floor and first floor.",
    concept:
      "A coherent interior across two levels, balancing the experience of shared dining with the character of each individual space.",
    cover: {
      src: "/assets/cafe-brunch/rdc-001.webp",
      alt: "Salle du café brunch au rez-de-chaussée, ouverte sur la façade vitrée",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/cafe-brunch-thumbnail.webp",
      alt: "Salle du café brunch au rez-de-chaussée, ouverte sur la façade vitrée",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/cafe-brunch/rdc-001.webp",
        alt: "Salle du café brunch au rez-de-chaussée, ouverte sur la façade vitrée",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/rdc-002.webp",
        alt: "Rez-de-chaussée du café brunch, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/rdc-003.webp",
        alt: "Rez-de-chaussée du café brunch, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/rdc-004.webp",
        alt: "Banquettes et tables au rez-de-chaussée",
        width: 1673,
        height: 940,
      },
      {
        src: "/assets/cafe-brunch/rdc-005.webp",
        alt: "Rez-de-chaussée du café brunch, cinquième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/rdc-006.webp",
        alt: "Rez-de-chaussée du café brunch, sixième vue",
        width: 1673,
        height: 940,
      },
      {
        src: "/assets/cafe-brunch/rdc-007.webp",
        alt: "Comptoir et espace de restauration du rez-de-chaussée",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/etage-1-001.webp",
        alt: "Espace de restauration au premier étage du café brunch",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/etage-1-002.webp",
        alt: "Premier étage du café brunch, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/etage-1-003.webp",
        alt: "Premier étage du café brunch, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cafe-brunch/etage-1-004.webp",
        alt: "Grande table et assises du premier étage",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "cabinet-dr-hamane",
    title: "Cabinet Dr Hamane",
    category: "Interior Design",
    kind: "Healthcare",
    number: "07",
    overview:
      "A psychiatry practice with bright spaces, a clear reception area and calm consultation rooms.",
    concept:
      "An interior focused on welcome and calm, from the reception space to the private consultation areas.",
    cover: {
      src: "/assets/cabinet-dr-hamane/001.webp",
      alt: "Réception et salle d'attente du Cabinet Dr Hamane",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/cabinet-thumbnail.webp",
      alt: "Réception et salle d'attente du Cabinet Dr Hamane",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/cabinet-dr-hamane/001.webp",
        alt: "Réception et salle d'attente du Cabinet Dr Hamane",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/002.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 2",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/003.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 3",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/004.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 4",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/005.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 5",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/006.webp",
        alt: "Bureau de consultation du Cabinet Dr Hamane",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/007.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 7",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/008.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 8",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/009.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 9",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/cabinet-dr-hamane/010.webp",
        alt: "Cabinet Dr Hamane, vue intérieure 10",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "dr-hafidi-opera",
    title: "Dr Hafidi Opera",
    category: "Interior Design",
    kind: "Healthcare",
    number: "08",
    overview:
      "An interior project presented through two waiting areas and a model of the complete layout.",
    concept:
      "The waiting spaces and overall model show how individual rooms relate within a complete interior proposal.",
    cover: {
      src: "/assets/dr-hafidi-opera/attente-1-001.webp",
      alt: "Accueil et assises de la salle d'attente 1",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/dr-hafidi-thumbnail.webp",
      alt: "Accueil et assises de la salle d'attente 1",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/dr-hafidi-opera/attente-1-001.webp",
        alt: "Accueil et assises de la salle d'attente 1",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/attente-1-002.webp",
        alt: "Salle d'attente 1 du Dr Hafidi Opera, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/attente-1-003.webp",
        alt: "Salle d'attente 1 du Dr Hafidi Opera, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/attente-1-004.webp",
        alt: "Salle d'attente 1 du Dr Hafidi Opera, quatrième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/vip-001.webp",
        alt: "Salon avec canapés de la salle d'attente VIP",
        width: 1254,
        height: 1254,
      },
      {
        src: "/assets/dr-hafidi-opera/vip-002.webp",
        alt: "Salle d'attente VIP du Dr Hafidi Opera, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/vip-003.webp",
        alt: "Salle d'attente VIP du Dr Hafidi Opera, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/vip-004.webp",
        alt: "Salle d'attente VIP du Dr Hafidi Opera, quatrième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-hafidi-opera/maquette-001.webp",
        alt: "Maquette d'ensemble du projet Dr Hafidi Opera",
        width: 1280,
        height: 720,
      },
      {
        src: "/assets/dr-hafidi-opera/maquette-002.webp",
        alt: "Maquette du projet Dr Hafidi Opera, deuxième vue",
        width: 1280,
        height: 720,
      },
      {
        src: "/assets/dr-hafidi-opera/maquette-003.webp",
        alt: "Maquette du projet Dr Hafidi Opera, troisième vue",
        width: 1280,
        height: 720,
      },
      {
        src: "/assets/dr-hafidi-opera/maquette-004.webp",
        alt: "Maquette du projet Dr Hafidi Opera, quatrième vue",
        width: 1280,
        height: 720,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "dr-samir-opera",
    title: "Dr Samir Opera",
    category: "Interior Design",
    kind: "Healthcare",
    number: "09",
    overview:
      "A bright practice interior, from the office and waiting area to the treatment spaces.",
    concept:
      "A connected sequence of reception, work and care spaces, explored through architectural visualization.",
    cover: {
      src: "/assets/dr-samir-opera/001.webp",
      alt: "Bureau du Dr Samir Opera et espace de consultation",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/dr-samir-thumbnail.webp",
      alt: "Bureau du Dr Samir Opera et espace de consultation",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/dr-samir-opera/001.webp",
        alt: "Bureau du Dr Samir Opera et espace de consultation",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/002.webp",
        alt: "Dr Samir Opera, vue intérieure 2",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/003.webp",
        alt: "Dr Samir Opera, vue intérieure 3",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/004.webp",
        alt: "Dr Samir Opera, vue intérieure 4",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/005.webp",
        alt: "Dr Samir Opera, vue intérieure 5",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/006.webp",
        alt: "Dr Samir Opera, vue intérieure 6",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/009.webp",
        alt: "Dr Samir Opera, vue intérieure 9",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/010.webp",
        alt: "Dr Samir Opera, vue intérieure 10",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/dr-samir-opera/011.webp",
        alt: "Dr Samir Opera, vue intérieure 11",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "appartement-ayoub",
    title: "Appartement Ayoub",
    category: "Interior Design",
    kind: "Residential interior",
    number: "10",
    overview:
      "A contemporary apartment with an open kitchen, living area, bedroom and versatile space.",
    concept:
      "The visual study connects shared living spaces with more private rooms, giving each area its own atmosphere within a coherent interior.",
    cover: {
      src: "/assets/appartement-ayoub/001.webp",
      alt: "Cuisine ouverte de l'Appartement Ayoub",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/ayoub-thumbnail.webp",
      alt: "Séjour et cuisine de l'Appartement Ayoub",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/appartement-ayoub/001.webp",
        alt: "Cuisine ouverte de l'Appartement Ayoub",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/002.webp",
        alt: "Cuisine et coin repas de l'Appartement Ayoub",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/003.webp",
        alt: "Séjour et cuisine de l'Appartement Ayoub",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/004.webp",
        alt: "Salle à manger de l'Appartement Ayoub",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/005.webp",
        alt: "Salon de l'Appartement Ayoub",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/006.webp",
        alt: "Chambre de l'Appartement Ayoub, première vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/007.webp",
        alt: "Chambre de l'Appartement Ayoub, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/008.webp",
        alt: "Chambre de l'Appartement Ayoub, troisième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/009.webp",
        alt: "Espace polyvalent avec bureau et équipements sportifs",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/010.webp",
        alt: "Espace polyvalent de l'Appartement Ayoub, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-ayoub/011.webp",
        alt: "Espace polyvalent de l'Appartement Ayoub, troisième vue",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
  {
    slug: "appartement-said-opera",
    title: "Appartement Said Opera",
    category: "Interior Design",
    kind: "Residential interior",
    number: "11",
    overview:
      "A contemporary living space where the lounge and dining area form a connected whole.",
    concept:
      "The living and dining zones respond to each other through a shared composition, with attention to light, furnishings and spatial flow.",
    cover: {
      src: "/assets/appartement-said-opera/001.webp",
      alt: "Salon de l'Appartement Said Opera, première vue",
      width: 1672,
      height: 941,
    },
    preview: {
      src: "/assets/thumbnails/said-thumbnail.webp",
      alt: "Salon de l'Appartement Said Opera, première vue",
      width: 1000,
      height: 563,
    },
    gallery: [
      {
        src: "/assets/appartement-said-opera/001.webp",
        alt: "Salon de l'Appartement Said Opera, première vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-said-opera/002.webp",
        alt: "Salon de l'Appartement Said Opera, deuxième vue",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-said-opera/003.webp",
        alt: "Salon et salle à manger de l'Appartement Said Opera",
        width: 1672,
        height: 941,
      },
      {
        src: "/assets/appartement-said-opera/004.webp",
        alt: "Salle à manger de l'Appartement Said Opera",
        width: 1672,
        height: 941,
      },
    ],
    services: ["Interior architecture", "3D visualization"],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
