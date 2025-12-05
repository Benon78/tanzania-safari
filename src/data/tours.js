export const tours = [
  {
    id: '1',
    slug: '3-day-mikumi-safari',
    title: '3-Day Mikumi Safari',
    category: 'safari',
    duration: '3 Days / 2 Nights',
    price: 650,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    shortDescription: 'Experience the wildlife of Mikumi National Park with expert local guides.',
    highlights: ['Game drives', 'Wildlife photography', 'Local guide', 'Comfortable lodging'],
    itinerary: [
      { day: 1, title: 'Arrival & Afternoon Game Drive', description: 'Depart from Dar es Salaam early morning. Arrive at Mikumi and enjoy an afternoon game drive.' },
      { day: 2, title: 'Full Day Game Drive', description: 'Full day exploring Mikumi with morning and afternoon game drives. Spot elephants, lions, and zebras.' },
      { day: 3, title: 'Morning Drive & Departure', description: 'Early morning game drive followed by departure back to Dar es Salaam.' },
    ],
    inclusions: ['Transport', 'Park fees', 'Accommodation', 'Meals', 'Guide'],
    exclusions: ['Flights', 'Travel insurance', 'Personal expenses', 'Tips'],
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
    ],
  },
  {
    id: '2',
    slug: '5-day-serengeti-adventure',
    title: '5-Day Serengeti Adventure',
    category: 'safari',
    duration: '5 Days / 4 Nights',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    shortDescription: 'Witness the Great Migration in the world-famous Serengeti National Park.',
    highlights: ['Great Migration', 'Big Five', 'Luxury tented camp', 'Balloon safari option'],
    itinerary: [
      { day: 1, title: 'Arusha to Serengeti', description: 'Fly or drive to Serengeti. Afternoon game drive.' },
      { day: 2, title: 'Full Day Serengeti', description: 'Explore the central Serengeti plains.' },
      { day: 3, title: 'Migration Tracking', description: 'Track the wildebeest migration herds.' },
      { day: 4, title: 'Northern Serengeti', description: 'Visit the northern territories for river crossings.' },
      { day: 5, title: 'Departure', description: 'Morning drive and transfer out.' },
    ],
    inclusions: ['All transport', 'Park fees', 'Luxury accommodation', 'All meals', 'Expert guide'],
    exclusions: ['International flights', 'Visa fees', 'Travel insurance', 'Balloon safari'],
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
    ],
  },
  {
    id: '3',
    slug: 'zanzibar-beach-escape',
    title: 'Zanzibar Beach Escape',
    category: 'beach',
    duration: '4 Days / 3 Nights',
    price: 750,
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    shortDescription: 'Relax on pristine beaches and explore the historic Stone Town.',
    highlights: ['Stone Town tour', 'Spice tour', 'Beach relaxation', 'Snorkeling'],
    itinerary: [
      { day: 1, title: 'Arrival in Zanzibar', description: 'Transfer to beach resort. Evening free.' },
      { day: 2, title: 'Stone Town Tour', description: 'Explore UNESCO World Heritage Stone Town.' },
      { day: 3, title: 'Spice Tour & Beach', description: 'Morning spice plantation visit, afternoon beach.' },
      { day: 4, title: 'Departure', description: 'Transfer to airport.' },
    ],
    inclusions: ['Airport transfers', 'Beach resort', 'Breakfast', 'Tours mentioned'],
    exclusions: ['Flights', 'Lunch & dinner', 'Personal expenses'],
    gallery: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
      'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800',
    ],
  },
  {
    id: '4',
    slug: 'kilimanjaro-day-hike',
    title: 'Kilimanjaro Day Hike',
    category: 'adventure',
    duration: '1 Day',
    price: 180,
    image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800',
    shortDescription: 'Hike to the first camp of Mount Kilimanjaro for stunning views.',
    highlights: ['Mandara Hut', 'Rainforest trek', 'Mountain views', 'Local guide'],
    itinerary: [
      { day: 1, title: 'Marangu Gate to Mandara Hut', description: 'Start at Marangu Gate, hike through rainforest to Mandara Hut at 2,700m.' },
    ],
    inclusions: ['Transport', 'Park fees', 'Guide & porter', 'Lunch'],
    exclusions: ['Hiking gear', 'Tips', 'Travel insurance'],
    gallery: [
      'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800',
      'https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=800',
    ],
  },
  {
    id: '5',
    slug: 'maasai-village-experience',
    title: 'Maasai Village Experience',
    category: 'cultural',
    duration: 'Half Day',
    price: 85,
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    shortDescription: 'Immerse yourself in authentic Maasai culture and traditions.',
    highlights: ['Traditional dances', 'Village tour', 'Local crafts', 'Cultural exchange'],
    itinerary: [
      { day: 1, title: 'Maasai Village Visit', description: 'Visit a traditional Maasai village, learn about their culture, watch dances, and browse handmade crafts.' },
    ],
    inclusions: ['Transport', 'Village fees', 'Guide', 'Refreshments'],
    exclusions: ['Souvenirs', 'Tips'],
    gallery: [
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    ],
  },
  {
    id: '6',
    slug: 'ngorongoro-crater-tour',
    title: 'Ngorongoro Crater Day Trip',
    category: 'daytrip',
    duration: '1 Day',
    price: 350,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
    shortDescription: "Descend into the world's largest intact volcanic caldera.",
    highlights: ['Crater descent', 'Big Five chance', 'Picnic lunch', 'Maasai viewpoint'],
    itinerary: [
      { day: 1, title: 'Ngorongoro Crater Exploration', description: 'Early departure, descend into the crater for a full day of wildlife viewing. Spot lions, rhinos, and flamingos.' },
    ],
    inclusions: ['Transport', 'Park fees', 'Guide', 'Picnic lunch'],
    exclusions: ['Drinks', 'Tips', 'Travel insurance'],
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
  },
  {
  id: '7',
  slug: 'tarangire-day-safari',
  title: 'Tarangire National Park Day Safari',
  category: 'safari',
  duration: '1 Day',
  price: 320,
  image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
  shortDescription: 'Famous for massive elephant herds and towering baobab trees.',
  highlights: [
    'Elephant herds',
    'Baobab landscapes',
    'Bird watching',
    'Full-day game drive'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Tarangire Full-Day Safari',
      description:
        'Early departure from Arusha. Full-day game viewing in Tarangire. See elephants, lions, giraffes, and iconic baobabs.'
    }
  ],
  inclusions: ['Transport', 'Park fees', 'Lunch', 'Guide', 'Drinks'],
  exclusions: ['Tips', 'Personal expenses'],
  gallery: [
    'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    'https://images.unsplash.com/photo-1531884070720-875c7622d4c6?w=800',
  
  ]
}
,
 {
  id: '8',
  slug: 'nyerere-selous-safari',
  title: '3-Day Nyerere (Selous) Safari',
  category: 'safari',
  duration: '3 Days / 2 Nights',
  price: 590,
  image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
  shortDescription: 'Africa’s largest protected ecosystem — famous for boat safaris and river wildlife.',
  highlights: [
    'Boat safari on Rufiji River',
    'Walking safari',
    'Game drives',
    'Hippos & crocodiles'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Transfer & Boat Safari',
      description:
        'Depart Dar. Arrive at Nyerere NP and enjoy an evening boat safari on the Rufiji River.'
    },
    {
      day: 2,
      title: 'Full-Day Game Drive',
      description:
        'Explore Nyerere NP with a full-day game drive — lions, elephants, wild dogs, buffalo.'
    },
    {
      day: 3,
      title: 'Walking Safari & Return',
      description:
        'Morning walking safari with armed ranger, then return to Dar es Salaam.'
    }
  ],
  inclusions: ['Transport', 'Park fees', 'Meals', 'Accommodation', 'Guide'],
  exclusions: ['Drinks', 'Tips', 'Personal expenses'],
  gallery: [
    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
    'https://images.unsplash.com/photo-1541417904950-b855846fe074?w=800'
  ]
}
,
  {
    id: '9',
    slug: 'pemba-island-retreat',
    title: 'Pemba Island Retreat',
    category: 'beach',
    duration: '5 Days / 4 Nights',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    shortDescription: 'A peaceful island escape with world-class diving and untouched beaches.',
    highlights: ['Diving', 'Snorkeling', 'Cliff views', 'Relaxation'],
    itinerary: [
      { day: 1, title: 'Arrival', description: 'Check in at ocean-front hotel.' },
      { day: 2, title: 'Full Beach Day', description: 'White-sand beaches and snorkeling.' },
      { day: 3, title: 'Diving Trip', description: 'Explore Pemba’s coral reefs.' },
      { day: 4, title: 'Pemba Tour', description: 'Visit local villages and spice farms.' },
      { day: 5, title: 'Departure', description: 'Transfer to Pemba Airport.' },
    ],
    inclusions: ['Breakfast', 'Hotel', 'Tours'],
    exclusions: ['Flights', 'Lunch & dinner'],
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
      'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800',
    ],
  },
  {
    id: '10',
    slug: 'ruaha-national-park-safari',
    title: '4-Day Ruaha National Park Safari',
    category: 'safari',
    duration: '4 Days / 3 Nights',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800',
    shortDescription: 'Visit Tanzania’s largest national park—remote, wild, and full of lions.',
    highlights: ['Big lions population', 'Wild landscapes', 'Birdlife', 'Riverside camps'],
    itinerary: [
      { day: 1, title: 'Arrival in Ruaha', description: 'Flight or drive to Ruaha.' },
      { day: 2, title: 'Full Day Safari', description: 'Full day exploring Ruaha.' },
      { day: 3, title: 'Southern Ruaha', description: 'Visit the remote regions of the park.' },
      { day: 4, title: 'Departure', description: 'Morning game drive and checkout.' },
    ],
    inclusions: ['Park fees', 'Accommodation', 'Meals', 'Guide'],
    exclusions: ['Tips', 'Insurance'],
    gallery: [
      'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800',
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800',
    ],
  },
 {
  id: '11',
  slug: 'mount-meru-trek',
  title: '3-Day Mount Meru Trek',
  category: 'adventure',
  duration: '3 Days / 2 Nights',
  price: 620,
 image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',

  shortDescription: "Climb Africa's 5th highest mountain with stunning views of Kilimanjaro.",
  highlights: [
    'Meru Crater',
    'Lush rainforest',
    'Wildlife on the trail',
    'Summit sunrise'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Momella Gate → Miriakamba Hut',
      description:
        'Start the trek with ranger escort through forest rich with wildlife.'
    },
    {
      day: 2,
      title: 'Miriakamba → Saddle Hut',
      description: 'Steep climb with scenic views of the crater and Ash Cone.'
    },
    {
      day: 3,
      title: 'Summit & Descend',
      description: 'Early morning summit push. Descend back to Momella Gate.'
    }
  ],
  inclusions: ['Park fees', 'Guide', 'Porters', 'Meals', 'Hut accommodation'],
  exclusions: ['Gear rental', 'Tips', 'Travel insurance'],
  gallery: [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800'
  ]
}
,
  {
  id: '12',
  slug: 'pugu-kazimzimbwe-nature-hike',
  title: 'Pugu Kazimzimbwe Nature Hike',
  category: 'adventure',
  duration: '1 Day',
  price: 45,
  image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
  shortDescription: 'Explore Pugu Kazimzimbwe Forest with its caves, hills, and rich biodiversity — perfect for nature lovers.',
  highlights: [
    'Guided nature walk',
    'Kazimzimbwe caves',
    'Panoramic viewpoints',
    'Bird watching',
    'Forest biodiversity'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Forest Hike & Caves Exploration',
      description:
        'Depart Dar early morning. Start hiking through the forest trails, visit the Kazimzimbwe caves, enjoy the hilltop viewpoint, and return by afternoon.'
    }
  ],
  inclusions: ['Transport', 'Guide', 'Entrance fees', 'Bottled water'],
  exclusions: ['Meals', 'Personal expenses', 'Tips'],
  gallery: [
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?w=800',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800'
  ]
},
];

export const destinations = [
  {
    name: 'Serengeti',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    description: 'Home to the Great Migration',
    slug: 'serengeti',
  },
  {
    name: 'Zanzibar',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800',
    description: 'Tropical paradise & spice island',
    slug: 'zanzibar',
  },
  {
    name: 'Mikumi',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    description: "Tanzania's accessible safari gem",
    slug: 'mikumi',
  },
  {
    name: 'Kilimanjaro',
    image: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800',
    description: "Africa's highest peak",
    slug: 'kilimanjaro',
  },
  {
    name: 'Ngorongoro',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
    description: 'Home of the world’s largest volcanic crater',
    slug: 'ngorongoro',
  },
  {
    name: 'Selous (Nyerere NP)',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800',
    description: 'Africa’s largest protected wildlife reserve',
    slug: 'selous',
  },
  {
    name: 'Ruaha',
    image: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800',
    description: 'Tanzania’s biggest, wildest national park',
    slug: 'ruaha',
  },
  {
    name: 'Pemba Island',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    description: 'Untouched island paradise north of Zanzibar',
    slug: 'pemba',
  },
  {
    name: 'Tarangire',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    description: 'Famous for elephants & ancient baobabs',
    slug: 'tarangire',
  },
  {
    name: 'Pugu Kazimzimbwe Forest',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    description: 'Nature trails, caves & rich biodiversity',
    slug: 'pugu-kazimzimbwe',
  },
];

export const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'United Kingdom',
    text: 'An absolutely incredible experience! Our guide was knowledgeable and passionate. We saw all the Big Five and the accommodations exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    location: 'Australia',
    text: 'Best safari company in Tanzania. Professional, safe, and truly authentic. The Serengeti migration was a once-in-a-lifetime experience.',
    rating: 5,
  },
  {
    name: 'Emma & David',
    location: 'Germany',
    text: 'From Zanzibar beaches to Ngorongoro Crater, every moment was perfectly organized. Highly recommend for families!',
    rating: 5,
  },
  {
    name: 'James Wilson',
    location: 'USA',
    text: 'The team went above and beyond to customize our trip. The local knowledge and personal touches made all the difference.',
    rating: 5,
  },
];
