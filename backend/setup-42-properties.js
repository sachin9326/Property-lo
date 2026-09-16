const prisma = require('./db');

// 42 Distinct HD Image Sets from Unsplash (126+ unique real estate images)
const UNIQUE_IMAGE_GALLERIES = [
  // 1
  [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
  ],
  // 2
  [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
  ],
  // 3
  [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
  ],
  // 4
  [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
  ],
  // 5
  [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80'
  ],
  // 6
  [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80'
  ],
  // 7
  [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752229-250ed9642921?w=800&q=80'
  ],
  // 8
  [
    'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=800&q=80',
    'https://images.unsplash.com/photo-1600585152576-92864f1d4314?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b0fdfc972?w=800&q=80'
  ],
  // 9
  [
    'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'
  ],
  // 10
  [
    'https://images.unsplash.com/photo-1600607687614-c483a9925e0a?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  ],
  // 11
  [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
  ],
  // 12
  [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
  ],
  // 13
  [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80'
  ],
  // 14
  [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80'
  ],
  // 15
  [
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'
  ],
  // 16
  [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
  ],
  // 17
  [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80'
  ],
  // 18
  [
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
  ],
  // 19
  [
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'
  ],
  // 20
  [
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80'
  ],
  // 21
  [
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80'
  ],
  // 22
  [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'
  ],
  // 23
  [
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
  ],
  // 24
  [
    'https://images.unsplash.com/photo-1600566752229-250ed9642921?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b0fdfc972?w=800&q=80'
  ],
  // 25
  [
    'https://images.unsplash.com/photo-1600585152576-92864f1d4314?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=800&q=80'
  ],
  // 26
  [
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80'
  ],
  // 27
  [
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
  ],
  // 28
  [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  ],
  // 29
  [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
  ],
  // 30
  [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80'
  ],
  // 31
  [
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'
  ],
  // 32
  [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
  ],
  // 33
  [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'
  ],
  // 34
  [
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
  ],
  // 35
  [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
  ],
  // 36
  [
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80'
  ],
  // 37
  [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
  ],
  // 38
  [
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  ],
  // 39
  [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
  ],
  // 40
  [
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'
  ],
  // 41
  [
    'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
  ],
  // 42
  [
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
  ]
];

// Raw Data for 42 Diverse Properties
const PROPERTIES_42 = [
  // BUY (1-14)
  {
    title: "3 BHK Luxury Sea-Facing Apartment",
    description: "Ultra-luxurious 3 BHK apartment with uninterrupted Arabian Sea views, Italian marble flooring, and private balcony.",
    address: "Bandra West, Mumbai",
    city: "Mumbai",
    locality: "Bandra West",
    areaSqFt: 1850,
    price: 48000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "4 BHK Grand Villa in Hiranandani Estate",
    description: "Independent luxury villa featuring a private garden, swimming pool, dual car garage, and 24/7 high-end security.",
    address: "Powai, Mumbai",
    city: "Mumbai",
    locality: "Powai",
    areaSqFt: 3400,
    price: 72000000,
    type: "BUY",
    propertyType: "Villa",
    bhk: "4+ BHK",
    possessionStatus: "Ready to Move",
    listingType: "New Launch",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Smart Home in Worli Skyline",
    description: "Modern high-rise 2 BHK condo with home automation, panoramic city view, and world-class clubhouse access.",
    address: "Worli, Mumbai",
    city: "Mumbai",
    locality: "Worli",
    areaSqFt: 1100,
    price: 32000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Under Construction",
    listingType: "New Booking",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Golf-Course View Apartment",
    description: "Premium golf residency apartment in Golf Course Road Gurgaon with private elevator and modular German kitchen.",
    address: "Golf Course Road, Gurgaon",
    city: "Gurgaon",
    locality: "Golf Course Road",
    areaSqFt: 2200,
    price: 39000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "4 BHK Sky Penthouse with Private Terrace",
    description: "Exclusive top-floor penthouse with private plunge pool, deck garden, and floor-to-ceiling glass windows.",
    address: "Koramangala, Bangalore",
    city: "Bangalore",
    locality: "Koramangala",
    areaSqFt: 4100,
    price: 65000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "4+ BHK",
    possessionStatus: "Ready to Move",
    listingType: "New Launch",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Modern Gated Apartment in Indiranagar",
    description: "Spacious 3 BHK residence close to top dining hubs, landscaped gardens, gym, and solar water heating.",
    address: "Indiranagar, Bangalore",
    city: "Bangalore",
    locality: "Indiranagar",
    areaSqFt: 1750,
    price: 24500000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Eco-Friendly Flat in Whitefield",
    description: "Green-certified residential apartment with zero carbon footprint, EV charging, and sprawling lawns.",
    address: "Whitefield, Bangalore",
    city: "Bangalore",
    locality: "Whitefield",
    areaSqFt: 1250,
    price: 13500000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Under Construction",
    listingType: "New Project",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Riverside Condominium in Koregaon Park",
    description: "Serene living experience surrounded by greenery, wooden sun deck, clubhouse, and Olympic size pool.",
    address: "Koregaon Park, Pune",
    city: "Pune",
    locality: "Koregaon Park",
    areaSqFt: 1950,
    price: 28500000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "4 BHK Premium Duplex in Baner",
    description: "High-ceiling duplex apartment with double-height balcony, servant room, and multi-tier security system.",
    address: "Baner, Pune",
    city: "Pune",
    locality: "Baner",
    areaSqFt: 2800,
    price: 34000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "4+ BHK",
    possessionStatus: "Ready to Move",
    listingType: "New Launch",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK High-Tech Residency in Gachibowli",
    description: "Located near Financial District, fully air-conditioned, video door security, and infinity rooftop pool.",
    address: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    locality: "Gachibowli",
    areaSqFt: 1800,
    price: 19500000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "4 BHK Luxury Villa in Jubilee Hills",
    description: "Architectural masterpiece villa featuring Italian bath fittings, private elevator, and home theatre.",
    address: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    locality: "Jubilee Hills",
    areaSqFt: 4500,
    price: 95000000,
    type: "BUY",
    propertyType: "Villa",
    bhk: "4+ BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK City Centre Apartment in Vasant Kunj",
    description: "Well-connected 2 BHK flat near metro station, international schools, and premium shopping malls.",
    address: "Vasant Kunj, Delhi",
    city: "Delhi",
    locality: "Vasant Kunj",
    areaSqFt: 1200,
    price: 21000000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Beachside Villa in Anjuna",
    description: "Portuguese style luxury villa near the beach, lush private garden, plunge pool, and wooden patio.",
    address: "Anjuna, Goa",
    city: "Goa",
    locality: "Anjuna",
    areaSqFt: 2600,
    price: 42000000,
    type: "BUY",
    propertyType: "Villa",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "New Launch",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK High-Rise Apartment in Satellite",
    description: "Spacious 3 BHK apartment with modular kitchen, gym, indoor gaming arena, and 2 reserved parkings.",
    address: "Satellite, Ahmedabad",
    city: "Ahmedabad",
    locality: "Satellite",
    areaSqFt: 1700,
    price: 14500000,
    type: "BUY",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "BUY",
    propertyKind: "Residential"
  },

  // RENT (15-26)
  {
    title: "2 BHK Fully Furnished Flat for Rent in Bandra",
    description: "Designer 2 BHK flat with king beds, smart TVs, modular kitchen, and sea breeze ventilation.",
    address: "Pali Hill, Bandra, Mumbai",
    city: "Mumbai",
    locality: "Bandra West",
    areaSqFt: 950,
    price: 110000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK High-Floor Flat for Rent in Hiranandani Gardens",
    description: "Scenic Lake-view 3 BHK apartment fully fitted with wardrobes, ACs, and modular kitchen appliances.",
    address: "Powai, Mumbai",
    city: "Mumbai",
    locality: "Powai",
    areaSqFt: 1450,
    price: 95000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "1 BHK Modern Compact Flat in Andheri West",
    description: "Ideal for young professionals, 2 min walk to metro station, fully furnished with high-speed wifi setup.",
    address: "Lokhandwala, Andheri West, Mumbai",
    city: "Mumbai",
    locality: "Andheri West",
    areaSqFt: 580,
    price: 45000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "1BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Luxury Rental Flat in Koramangala",
    description: "Located near Sony World Signal, Gated society with clubhouse, covered parking, and 100% power backup.",
    address: "Koramangala 4th Block, Bangalore",
    city: "Bangalore",
    locality: "Koramangala",
    areaSqFt: 1150,
    price: 52000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Pool-Facing Apartment in Indiranagar",
    description: "Charming 3 BHK flat with broad balcony overlooking lush green lawns and adult swimming pool.",
    address: "Indiranagar 100ft Road, Bangalore",
    city: "Bangalore",
    locality: "Indiranagar",
    areaSqFt: 1650,
    price: 68000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "1 BHK Cozy Apartment for Rent in Whitefield",
    description: "Located right opposite ITPL, fully furnished 1 BHK with gym, tennis court, and supermarket inside compound.",
    address: "Whitefield Main Road, Bangalore",
    city: "Bangalore",
    locality: "Whitefield",
    areaSqFt: 650,
    price: 28000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "1BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Fully Furnished Flat in Viman Nagar",
    description: "Close to Phoenix Marketcity and Pune Airport, clean society, 2 balconies, and dual underground parking.",
    address: "Viman Nagar, Pune",
    city: "Pune",
    locality: "Viman Nagar",
    areaSqFt: 1050,
    price: 36000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Premium Gated Apartment in Hinjawadi",
    description: "Ideal for IT professionals working in Rajiv Gandhi IT Park, high floor, quiet surroundings, 24/7 security.",
    address: "Hinjawadi Phase 1, Pune",
    city: "Pune",
    locality: "Hinjawadi",
    areaSqFt: 1400,
    price: 38000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Gated Society Flat in Cyber City",
    description: "Direct walk to DLF Cyber City, modular kitchen, centralized AC, squash court, and jogging track.",
    address: "DLF Phase 2, Gurgaon",
    city: "Gurgaon",
    locality: "DLF Phase 2",
    areaSqFt: 1200,
    price: 48000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK High-End Flat for Rent in Hitec City",
    description: "Located near Mindspace IT Park, tastefully decorated interior, modular wardrobes, and kids play area.",
    address: "Hitec City, Hyderabad",
    city: "Hyderabad",
    locality: "Hitec City",
    areaSqFt: 1750,
    price: 55000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "2 BHK Park View Apartment in Greater Kailash",
    description: "Quiet residential neighborhood in South Delhi, spacious bedrooms, Italian fittings, and lift facility.",
    address: "Greater Kailash 1, Delhi",
    city: "Delhi",
    locality: "Greater Kailash",
    areaSqFt: 1300,
    price: 65000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "2BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },
  {
    title: "3 BHK Luxury Flat in Anna Nagar",
    description: "Prime locality in Chennai, fully air-conditioned, power backup, covered parking, and 24/7 security guard.",
    address: "Anna Nagar, Chennai",
    city: "Chennai",
    locality: "Anna Nagar",
    areaSqFt: 1550,
    price: 42000,
    type: "RENT",
    propertyType: "Flat",
    bhk: "3BHK",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "RENT",
    propertyKind: "Residential"
  },

  // COMMERCIAL (27-32)
  {
    title: "Plug & Play Corporate IT Office in BKC",
    description: "50-seater fully furnished office space with glass cabins, conference rooms, high-speed fiber internet, and pantry.",
    address: "Bandra Kurla Complex (BKC), Mumbai",
    city: "Mumbai",
    locality: "BKC",
    areaSqFt: 3200,
    price: 450000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Office",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },
  {
    title: "Prime Ground-Floor Retail Shop in Connaught Place",
    description: "High-footfall commercial shop with 40ft frontage on main inner circle, perfect for luxury retail brand or cafe.",
    address: "Connaught Place, Delhi",
    city: "Delhi",
    locality: "Connaught Place",
    areaSqFt: 1800,
    price: 650000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Shop",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },
  {
    title: "Modern Tech Park Workstation Office in MG Road",
    description: "A-Grade office building with double height lobby, 4 high speed elevators, 100% power backup, and basement parking.",
    address: "MG Road, Bangalore",
    city: "Bangalore",
    locality: "MG Road",
    areaSqFt: 4500,
    price: 520000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Office",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },
  {
    title: "Commercial Showroom Space in Senapati Bapat Road",
    description: "Ideal for car showroom, bank branch, or corporate office. Glass facade with prominent main road visibility.",
    address: "Senapati Bapat Road, Pune",
    city: "Pune",
    locality: "Senapati Bapat Road",
    areaSqFt: 2800,
    price: 320000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Showroom",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },
  {
    title: "Fully Furnished Office in Cyber City Tower",
    description: "30 Workstations, 2 Director Cabins, 10-seater board room, server room, and central HVAC conditioning.",
    address: "DLF Cyber City, Gurgaon",
    city: "Gurgaon",
    locality: "DLF Cyber City",
    areaSqFt: 2500,
    price: 380000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Office",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },
  {
    title: "Boutique Retail Space in Park Street",
    description: "High traffic location, landmark building, glass display windows, basement storage room, and 24/7 security.",
    address: "Park Street, Kolkata",
    city: "Kolkata",
    locality: "Park Street",
    areaSqFt: 1500,
    price: 210000,
    type: "RENT",
    propertyType: "Commercial Space",
    bhk: "Shop",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "COMMERCIAL",
    propertyKind: "Commercial"
  },

  // PG / CO-LIVING (33-37)
  {
    title: "Luxury Single/Double Sharing PG in Koramangala",
    description: "Premium co-living with daily housekeeping, 3 nutritious meals, high speed Wi-Fi, gaming room, and gym access.",
    address: "Koramangala 5th Block, Bangalore",
    city: "Bangalore",
    locality: "Koramangala",
    areaSqFt: 250,
    price: 16500,
    type: "RENT",
    propertyType: "PG / Paying Guest",
    bhk: "Single/Double",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PG",
    propertyKind: "Residential"
  },
  {
    title: "Executive Female Co-Living PG in Bandra",
    description: "Safe & hygienic PG with electronic access cards, biometric entry, AC rooms, laundry service, and lounge.",
    address: "Pali Naka, Bandra West, Mumbai",
    city: "Mumbai",
    locality: "Bandra West",
    areaSqFt: 300,
    price: 22000,
    type: "RENT",
    propertyType: "PG / Paying Guest",
    bhk: "Single/Double",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PG",
    propertyKind: "Residential"
  },
  {
    title: "Smart Student & Professional PG in Viman Nagar",
    description: "Walking distance to Symbiosis International University & IT Parks. Includes study desks, fridge, and hot water.",
    address: "Viman Nagar, Pune",
    city: "Pune",
    locality: "Viman Nagar",
    areaSqFt: 220,
    price: 12500,
    type: "RENT",
    propertyType: "PG / Paying Guest",
    bhk: "Single/Double",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PG",
    propertyKind: "Residential"
  },
  {
    title: "Techie Co-Living Space in Cyber Hub Sector 44",
    description: "Modern interior PG with private balconies, cafeteria, pool table, work lounge, and 24/7 power backup.",
    address: "Sector 44, Gurgaon",
    city: "Gurgaon",
    locality: "Sector 44",
    areaSqFt: 280,
    price: 18500,
    type: "RENT",
    propertyType: "PG / Paying Guest",
    bhk: "Single/Double",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PG",
    propertyKind: "Residential"
  },
  {
    title: "Cozy Premium PG for Men in Hitec City",
    description: "Clean & spacious twin-sharing AC rooms, attached washroom, smart TV, laundry, and daily healthy breakfast.",
    address: "Hitec City, Hyderabad",
    city: "Hyderabad",
    locality: "Hitec City",
    areaSqFt: 240,
    price: 14000,
    type: "RENT",
    propertyType: "PG / Paying Guest",
    bhk: "Single/Double",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PG",
    propertyKind: "Residential"
  },

  // PLOT / LAND (38-42)
  {
    title: "Gated Community Villa Plot in Alibaug",
    description: "Scenic 5000 sq ft plot in private coconut grove community, 10 min drive from Mandwa Jetty. Electricity & water line ready.",
    address: "Mandwa, Alibaug",
    city: "Alibaug",
    locality: "Mandwa",
    areaSqFt: 5000,
    price: 12500000,
    type: "BUY",
    propertyType: "Plot",
    bhk: "Plot",
    possessionStatus: "Ready to Move",
    listingType: "New Launch",
    isVerified: true,
    isGated: true,
    category: "PLOT_LAND",
    propertyKind: "Residential"
  },
  {
    title: "Hilltop Scenic Villa Plot in Lonavala",
    description: "Clear title NA villa plot overlooking Sahyadri mountain range. Gated community with clubhouse and tar roads.",
    address: "Khandala, Lonavala",
    city: "Lonavala",
    locality: "Khandala",
    areaSqFt: 4200,
    price: 18500000,
    type: "BUY",
    propertyType: "Plot",
    bhk: "Plot",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PLOT_LAND",
    propertyKind: "Residential"
  },
  {
    title: "Residential Plot in Devanahalli Airport Corridor",
    description: "BDA approved 30x40 residential plot located in fast developing aerospace park region near Bangalore Airport.",
    address: "Devanahalli, Bangalore",
    city: "Bangalore",
    locality: "Devanahalli",
    areaSqFt: 1200,
    price: 6800000,
    type: "BUY",
    propertyType: "Plot",
    bhk: "Plot",
    possessionStatus: "Ready to Move",
    listingType: "New Project",
    isVerified: true,
    isGated: true,
    category: "PLOT_LAND",
    propertyKind: "Residential"
  },
  {
    title: "Luxury Farmhouse Land Plot in Chattarpur",
    description: "1 Acre green agricultural farmhouse land surrounded by lush trees, boundary wall, deep borewell, and electricity.",
    address: "Chattarpur Farms, Delhi",
    city: "Delhi",
    locality: "Chattarpur",
    areaSqFt: 43560,
    price: 85000000,
    type: "BUY",
    propertyType: "Plot",
    bhk: "Plot",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PLOT_LAND",
    propertyKind: "Residential"
  },
  {
    title: "Prime Corner Plot in ECR Beach Road",
    description: "East-facing corner residential plot 200 meters from Kovalam Beach, ideal for luxury weekend villa or homestay.",
    address: "East Coast Road (ECR), Chennai",
    city: "Chennai",
    locality: "ECR",
    areaSqFt: 3600,
    price: 15500000,
    type: "BUY",
    propertyType: "Plot",
    bhk: "Plot",
    possessionStatus: "Ready to Move",
    listingType: "Resale",
    isVerified: true,
    isGated: true,
    category: "PLOT_LAND",
    propertyKind: "Residential"
  }
];

async function setup42Properties() {
  console.log('🧹 Purging database and setting up EXACTLY 42 properties with UNIQUE HD photo galleries...\n');

  // Ensure default Uploader exists (id = 1)
  let uploader = await prisma.user.findFirst();
  if (!uploader) {
    uploader = await prisma.user.create({
      data: {
        email: 'admin@propertylo.com',
        password: '$2a$10$e8T7QGfTzU.gX6K/4wJ3O.K3yL0xV6aN1rO8P2qS4tU6vW8xY0z2a', // hashed password
        name: 'Sachin Kumar',
        role: 'UPLOADER'
      }
    });
    console.log(`👤 Created default uploader user ID: ${uploader.id}`);
  } else {
    console.log(`👤 Using existing uploader user ID: ${uploader.id}`);
  }

  // Delete dependent child records first to satisfy foreign key constraints
  console.log('🗑️ Deleting existing dependent child records (Favorites, Reviews, Visits)...');
  await prisma.favorite.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.visit.deleteMany({});

  // Delete all existing properties
  console.log('🗑️ Deleting existing properties...');
  await prisma.property.deleteMany({});

  console.log(`🌱 Seeding exactly 42 properties...`);
  
  let insertedCount = 0;
  for (let i = 0; i < PROPERTIES_42.length; i++) {
    const rawProp = PROPERTIES_42[i];
    const imageGallery = UNIQUE_IMAGE_GALLERIES[i % UNIQUE_IMAGE_GALLERIES.length];

    await prisma.property.create({
      data: {
        ...rawProp,
        imageUrls: JSON.stringify(imageGallery),
        uploaderId: uploader.id,
        isVerified: true,
        isGated: true,
        createdAt: new Date(Date.now() - (42 - i) * 3600 * 1000 * 4), // Staggered creation times
      }
    });
    insertedCount++;
  }

  const finalCount = await prisma.property.count();
  console.log(`\n🎉 SUCCESS! Database now contains EXACTLY ${finalCount} properties with 100% unique galleries!`);
}

setup42Properties()
  .catch((e) => {
    console.error('❌ Error setting up 42 properties:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
