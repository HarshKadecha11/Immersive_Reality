// Gujarat cities
const gujaratCities = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Gandhinagar",
  "Anand",
  "Nadiad",
  "Mehsana",
  "Morbi",
  "Surendranagar",
  "Patan",
  "Bharuch",
  "Navsari",
  "Valsad",
  "Porbandar",
  "Godhra",
  "Palanpur",
];

// Property types
const propertyTypes = [
  "Villa",
  "Apartment",
  "Penthouse",
  "Bungalow",
  "Farmhouse",
  "Row House",
  "Duplex",
];

// Property statuses
const propertyStatuses = [
  "For Sale",
  "For Rent",
  "Sold Out",
  "New Launch",
  "Under Construction",
];

// Property amenities
const amenities = [
  "Swimming Pool",
  "Garden",
  "Parking",
  "Gym",
  "Security",
  "Power Backup",
  "Children's Play Area",
  "Club House",
  "Jogging Track",
  "Tennis Court",
  "Basketball Court",
  "Indoor Games",
  "Yoga Deck",
  "Spa",
  "Sauna",
  "Jacuzzi",
  "Rooftop Terrace",
  "BBQ Area",
  "Visitor Parking",
  "24/7 Water Supply",
  "CCTV Surveillance",
  "Fire Safety",
  "Elevator",
  "Rainwater Harvesting",
  "Solar Panels",
];

// Agent names
const agentNames = [
  "Rahul Sharma",
  "Priya Patel",
  "Amit Singh",
  "Neha Desai",
  "Vikram Mehta",
  "Anjali Joshi",
  "Rajesh Kumar",
  "Meera Shah",
  "Sanjay Verma",
  "Deepa Gandhi",
];

// Generate a random number between min and max (inclusive)
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random items from an array
const getRandomItems = (array: any[], count: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate a random property
const generateProperty = (id: number) => {
  const city = gujaratCities[getRandomNumber(0, gujaratCities.length - 1)];
  const type = propertyTypes[getRandomNumber(0, propertyTypes.length - 1)];
  const status =
    propertyStatuses[getRandomNumber(0, propertyStatuses.length - 1)];
  const bedrooms = getRandomNumber(1, 6);
  const bathrooms = getRandomNumber(1, bedrooms + 1);
  const sqft = getRandomNumber(800, 5000);

  // More affordable pricing for middle class and students
  let price;
  if (status === "For Rent") {
    // Student/middle class rental pricing
    if (Math.random() < 0.4) {
      // 40% chance of being student/budget rental
      price = getRandomNumber(5000, 25000); // Budget rentals (5K-25K per month)
    } else {
      price = getRandomNumber(15000, 150000); // Regular rentals
    }
  } else {
    // Middle class and premium properties for sale
    if (Math.random() < 0.5) {
      // 50% chance of being middle class property
      price = getRandomNumber(1500000, 8000000); // Middle class (15L-80L)
    } else {
      price = getRandomNumber(8000000, 100000000); // Premium properties
    }
  }

  // Generate a title
  const adjectives = [
    "Luxury",
    "Modern",
    "Spacious",
    "Elegant",
    "Premium",
    "Exclusive",
    "Stunning",
    "Beautiful",
    "Affordable",
    "Cozy",
    "Budget",
    "Student-Friendly",
    "Compact",
    "Comfortable",
    "Convenient",
    "Value",
  ];

  // Choose appropriate adjective based on price
  let adjective;
  if (status === "For Rent" && price < 25000) {
    // Budget rentals get budget-friendly adjectives
    const budgetAdjectives = [
      "Affordable",
      "Budget",
      "Student-Friendly",
      "Cozy",
      "Compact",
      "Convenient",
      "Value",
    ];
    adjective =
      budgetAdjectives[getRandomNumber(0, budgetAdjectives.length - 1)];
  } else if (price < 8000000 && status !== "For Rent") {
    // Middle class properties
    const middleClassAdjectives = [
      "Comfortable",
      "Modern",
      "Spacious",
      "Cozy",
      "Convenient",
      "Value",
    ];
    adjective =
      middleClassAdjectives[
        getRandomNumber(0, middleClassAdjectives.length - 1)
      ];
  } else {
    // Premium properties
    const premiumAdjectives = [
      "Luxury",
      "Elegant",
      "Premium",
      "Exclusive",
      "Stunning",
      "Beautiful",
    ];
    adjective =
      premiumAdjectives[getRandomNumber(0, premiumAdjectives.length - 1)];
  }

  const title = `${adjective} ${type} in ${city}`;

  // Generate a location within the city
  const locations = [
    "Satellite",
    "Navrangpura",
    "Bodakdev",
    "Vastrapur",
    "Prahladnagar",
    "Thaltej",
    "Bopal",
    "Ambawadi",
    "Vesu",
    "Adajan",
    "Citylight",
    "Athwa",
    "Pal",
    "Althan",
    "Varachha",
    "Katargam",
    "Alkapuri",
    "Sayajigunj",
    "Akota",
    "Karelibaug",
    "Manjalpur",
    "Vasna",
    "Gotri",
    "Fatehgunj",
    "Kalawad Road",
    "University Road",
    "Raiya Road",
    "Mavdi",
    "Amin Marg",
    "Kalavad Road",
  ];
  const location = `${locations[getRandomNumber(0, locations.length - 1)]}, ${city}, Gujarat`;

  // Generate random coordinates near Gujarat
  const coordinates = {
    lat: 22 + Math.random() * 2,
    lng: 71 + Math.random() * 2,
  };

  // Select random amenities
  const propertyAmenities = getRandomItems(amenities, getRandomNumber(5, 12));

  // Select a random agent
  const agentName = agentNames[getRandomNumber(0, agentNames.length - 1)];
  const agent = {
    name: agentName,
    phone: `+91 ${getRandomNumber(70000, 99999)} ${getRandomNumber(10000, 99999)}`,
    email: `${agentName.toLowerCase().replace(" ", ".")}@estatevista.com`,
    photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${agentName.replace(" ", "")}`,
  };

  // Generate nearby facilities
  const facilityTypes = [
    "hospital",
    "school",
    "transportation",
    "shopping",
    "college",
    "library",
    "park",
  ];
  const nearbyFacilities = [];

  // Add more student-friendly facilities for budget rentals
  const isStudentProperty = status === "For Rent" && price < 25000;
  const facilitiesCount = isStudentProperty
    ? getRandomNumber(5, 8)
    : getRandomNumber(3, 6);

  for (let i = 0; i < facilitiesCount; i++) {
    // For student properties, prioritize colleges, libraries, and transportation
    let facilityType;
    if (isStudentProperty && i < 3) {
      const studentFacilityTypes = ["college", "library", "transportation"];
      facilityType = studentFacilityTypes[i % studentFacilityTypes.length];
    } else {
      facilityType =
        facilityTypes[getRandomNumber(0, facilityTypes.length - 1)];
    }

    let facilityName = "";

    if (facilityType === "hospital") {
      const hospitalNames = [
        "City Hospital",
        "General Hospital",
        "Medicare Center",
        "Apollo Hospital",
        "Care Hospital",
        "Community Health Center",
      ];
      facilityName =
        hospitalNames[getRandomNumber(0, hospitalNames.length - 1)];
    } else if (facilityType === "school") {
      const schoolNames = [
        "Green Valley School",
        "St. Xavier's School",
        "Delhi Public School",
        "Modern School",
        "International School",
        "Public School",
      ];
      facilityName = schoolNames[getRandomNumber(0, schoolNames.length - 1)];
    } else if (facilityType === "college") {
      const collegeNames = [
        "Gujarat University",
        "Nirma University",
        "PDPU University",
        "MS University",
        "Engineering College",
        "Medical College",
        "Arts & Commerce College",
        "Law College",
      ];
      facilityName = collegeNames[getRandomNumber(0, collegeNames.length - 1)];
    } else if (facilityType === "library") {
      const libraryNames = [
        "Central Library",
        "Public Library",
        "Digital Library",
        "University Library",
        "Community Library",
      ];
      facilityName = libraryNames[getRandomNumber(0, libraryNames.length - 1)];
    } else if (facilityType === "transportation") {
      const transportNames = [
        "Metro Station",
        "Bus Station",
        "Railway Station",
        "Airport",
        "Highway Access",
        "Bus Stop",
        "Auto Stand",
      ];
      facilityName =
        transportNames[getRandomNumber(0, transportNames.length - 1)];
    } else if (facilityType === "park") {
      const parkNames = [
        "City Park",
        "Garden",
        "Recreational Area",
        "Sports Complex",
        "Jogging Park",
      ];
      facilityName = parkNames[getRandomNumber(0, parkNames.length - 1)];
    } else {
      const shoppingNames = [
        "Shopping Mall",
        "Supermarket",
        "Market Complex",
        "Retail Park",
        "Commercial Center",
        "Local Market",
        "Grocery Store",
        "Convenience Store",
      ];
      facilityName =
        shoppingNames[getRandomNumber(0, shoppingNames.length - 1)];
    }

    // Make distances closer for student properties
    const maxDistance = isStudentProperty ? 2 : 5;
    nearbyFacilities.push({
      name: facilityName,
      distance: `${(Math.random() * maxDistance).toFixed(1)} km`,
      type: facilityType,
    });
  }

  // Generate financing options
  const financingOptions = [
    {
      name: "Standard Loan",
      rate: `${(7 + Math.random() * 3).toFixed(1)}%`,
      term: `${getRandomNumber(10, 30)} years`,
    },
    {
      name: "First-Time Buyer",
      rate: `${(6.5 + Math.random() * 2).toFixed(1)}%`,
      term: `${getRandomNumber(15, 30)} years`,
    },
    {
      name: "Investment Plan",
      rate: `${(8 + Math.random() * 3).toFixed(1)}%`,
      term: `${getRandomNumber(10, 20)} years`,
    },
  ];

  // Generate description based on property type
  let descriptions = [];

  if (status === "For Rent" && price < 25000) {
    // Student/budget rental descriptions
    descriptions = [
      `Perfect for students! This ${adjective.toLowerCase()} ${type.toLowerCase()} is located near ${nearbyFacilities.find((f) => f.type === "college")?.name || "educational institutions"} in ${location.split(",")[0]}, ${city}. The property includes ${propertyAmenities.slice(0, 3).join(", ")}, and is just ${nearbyFacilities[0].distance} from ${nearbyFacilities[0].name}.`,
      `Ideal for students and young professionals, this budget-friendly ${type.toLowerCase()} in ${location.split(",")[0]} offers ${bedrooms} bedroom(s) and essential amenities. Located within easy reach of ${nearbyFacilities.find((f) => f.type === "transportation")?.name || "public transportation"} and local conveniences.`,
      `Affordable ${type.toLowerCase()} perfect for students or working professionals in ${location.split(",")[0]}. This compact ${sqft} sqft space has ${bedrooms} bedroom(s) and is conveniently located near ${nearbyFacilities.find((f) => f.type === "college")?.name || nearbyFacilities[0].name}.`,
      `Budget-friendly accommodation in a prime location near ${nearbyFacilities.find((f) => f.type === "college")?.name || "educational institutions"}. This ${bedrooms}-bedroom ${type.toLowerCase()} offers basic amenities and good connectivity to the city.`,
    ];
  } else if (price < 8000000 && status !== "For Rent") {
    // Middle class property descriptions
    descriptions = [
      `Perfect for families! This ${adjective.toLowerCase()} ${type.toLowerCase()} in ${location.split(",")[0]}, ${city} offers great value with ${bedrooms} bedrooms and ${bathrooms} bathrooms. The property includes ${propertyAmenities.slice(0, 3).join(", ")}, and is close to ${nearbyFacilities.find((f) => f.type === "school")?.name || nearbyFacilities[0].name}.`,
      `Ideal middle-class home in a well-connected neighborhood of ${location.split(",")[0]}. This ${sqft} sqft ${type.toLowerCase()} features ${bedrooms} comfortable bedrooms and is close to essential amenities including ${nearbyFacilities.find((f) => f.type === "shopping")?.name || "markets"} and ${nearbyFacilities.find((f) => f.type === "school")?.name || "schools"}.`,
      `Affordable family ${type.toLowerCase()} in the developing area of ${location.split(",")[0]}. With ${bedrooms} bedrooms and ${bathrooms} bathrooms, this property offers good value for money and access to ${nearbyFacilities
        .slice(0, 2)
        .map((f) => f.name)
        .join(" and ")}.`,
      `Value-for-money ${type.toLowerCase()} in ${location.split(",")[0]}, ${city}. This ${bedrooms}-bedroom property spans ${sqft} sqft and is perfect for small families looking for a comfortable home in a decent locality.`,
    ];
  } else {
    // Premium property descriptions
    descriptions = [
      `This stunning ${adjective.toLowerCase()} ${type.toLowerCase()} is located in the heart of ${location.split(",")[0]}, ${city}. It features modern architecture, premium finishes, and spacious rooms with abundant natural light. The property includes ${propertyAmenities.slice(0, 3).join(", ")}, and is close to ${nearbyFacilities[0].name}.`,
      `Experience luxury living in this beautiful ${type.toLowerCase()} situated in the prime location of ${location.split(",")[0]}. With ${bedrooms} bedrooms and ${bathrooms} bathrooms, this property offers ample space for comfortable living. Enjoy amenities like ${propertyAmenities.slice(0, 3).join(", ")}.`,
      `A rare opportunity to own this ${adjective.toLowerCase()} ${type.toLowerCase()} in the prestigious area of ${location.split(",")[0]}. The property spans ${sqft} sqft and features ${bedrooms} spacious bedrooms, ${bathrooms} elegant bathrooms, and premium amenities including ${propertyAmenities.slice(0, 3).join(", ")}.`,
      `Welcome to this exquisite ${type.toLowerCase()} located in the serene neighborhood of ${location.split(",")[0]}, ${city}. This ${bedrooms}-bedroom property offers modern living spaces, high-quality finishes, and amenities such as ${propertyAmenities.slice(0, 3).join(", ")}. Conveniently located near ${nearbyFacilities[0].name} and ${nearbyFacilities[1]?.name || "shopping centers"}.`,
    ];
  }

  const description = descriptions[getRandomNumber(0, descriptions.length - 1)];

  // Generate images
  const imageIds = [
    "1600585154340",
    "1600607687939",
    "1600596542815",
    "1600047509807",
    "1613490493576",
    "1512917774080",
    "1600566752355",
    "1600210724404",
    "1582376432754",
    "1560518883",
    "1564013648685",
    "1600566752426",
    "1600210724530",
    "1531835363959",
    "1523217695958",
    "1600566752647",
    "1523217695958",
    "1600607688019",
    "1600607687939",
    "1600607688066",
  ];

  const images = [];
  const mainImageId = imageIds[getRandomNumber(0, imageIds.length - 1)];
  images.push(`https://images.unsplash.com/photo-${mainImageId}?w=800&q=80`);

  // Add 3-5 more images
  const additionalImageCount = getRandomNumber(3, 5);
  for (let i = 0; i < additionalImageCount; i++) {
    const imageId = imageIds[getRandomNumber(0, imageIds.length - 1)];
    if (
      !images.includes(
        `https://images.unsplash.com/photo-${imageId}?w=800&q=80`,
      )
    ) {
      images.push(`https://images.unsplash.com/photo-${imageId}?w=800&q=80`);
    } else {
      // If duplicate, try another one
      const newImageId = imageIds[getRandomNumber(0, imageIds.length - 1)];
      images.push(`https://images.unsplash.com/photo-${newImageId}?w=800&q=80`);
    }
  }

  return {
    id: `prop${id}`,
    title,
    description,
    price,
    type,
    location,
    coordinates,
    bedrooms,
    bathrooms,
    sqft,
    amenities: propertyAmenities,
    nearbyFacilities,
    agent,
    status,
    financingOptions,
    images,
    city,
  };
};

// Generate 100 properties (increased from 50 to include more middle class and student options)
export const properties = Array.from({ length: 100 }, (_, i) =>
  generateProperty(i + 1),
);

// Export properties by city
export const getPropertiesByCity = (city: string) => {
  return properties.filter((property) => property.location.includes(city));
};

// Export properties by type
export const getPropertiesByType = (type: string) => {
  return properties.filter((property) => property.type === type);
};

// Export properties by status
export const getPropertiesByStatus = (status: string) => {
  return properties.filter((property) => property.status === status);
};

// Export properties by price range
export const getPropertiesByPriceRange = (
  minPrice: number,
  maxPrice: number,
) => {
  return properties.filter(
    (property) => property.price >= minPrice && property.price <= maxPrice,
  );
};

// Export properties by bedrooms
export const getPropertiesByBedrooms = (minBedrooms: number) => {
  return properties.filter((property) => property.bedrooms >= minBedrooms);
};

// Export properties by bathrooms
export const getPropertiesByBathrooms = (minBathrooms: number) => {
  return properties.filter((property) => property.bathrooms >= minBathrooms);
};

// Export properties by amenities
export const getPropertiesByAmenities = (requiredAmenities: string[]) => {
  return properties.filter((property) =>
    requiredAmenities.every((amenity) => property.amenities.includes(amenity)),
  );
};

// Export a single property by ID
export const getPropertyById = (id: string) => {
  return properties.find((property) => property.id === id);
};

export default properties;
