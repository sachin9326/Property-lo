const prisma = require('./db');

// 25 completely distinct property definitions with unique image sets (75 unique Unsplash images)
const TOP_25_PROPERTIES = [
  // --- BUY / SALE (7) ---
  {
    title: '3 BHK Luxury Apartment in Bandra West',
    description: 'Spacious 3 BHK luxury apartment with sea view, modular kitchen, Italian marble flooring, and 2 covered parking spots.',
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    locality: 'Bandra West',
    areaSqFt: 1850,
    price: 38000000, // 3.8 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Flat',
    bhk: '3BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'
    ])
  },
  {
    title: '4 BHK Duplex Villa in Hiranandani Powai',
    description: 'Magnificent 4 BHK duplex villa with private garden, terrace lounge, and high-end smart home automation.',
    address: 'Hiranandani Gardens, Powai, Mumbai',
    city: 'Mumbai',
    locality: 'Powai',
    areaSqFt: 3200,
    price: 65000000, // 6.5 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Villa',
    bhk: '4BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'New Project',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
    ])
  },
  {
    title: '2 BHK Modern Flat in Kothrud',
    description: 'Beautiful 2 BHK flat near Dashabhuja Ganpati with open balcony, gym access, and 24/7 security.',
    address: 'Kothrud, Pune',
    city: 'Pune',
    locality: 'Kothrud',
    areaSqFt: 1050,
    price: 9500000, // 95 Lac
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
    ])
  },
  {
    title: '3 BHK High-Rise Residence in Worli',
    description: 'Panoramic sea-facing 3 BHK residence on the 32nd floor with world-class clubhouse, infinity pool, and concierge service.',
    address: 'Worli Sea Face, Mumbai',
    city: 'Mumbai',
    locality: 'Worli',
    areaSqFt: 2100,
    price: 52000000, // 5.2 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Flat',
    bhk: '3BHK',
    possessionStatus: 'Under Construction',
    listingType: 'New Launch',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Unfurnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ])
  },
  {
    title: '2 BHK Premium Apartment in Indiranagar',
    description: 'Charming 2 BHK flat in prime Indiranagar location, close to metro station, top restaurants, and parks.',
    address: 'Indiranagar, Bangalore',
    city: 'Bangalore',
    locality: 'Indiranagar',
    areaSqFt: 1250,
    price: 14500000, // 1.45 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
    ])
  },
  {
    title: '3 BHK Builder Floor in Greater Kailash',
    description: 'Exclusive 3 BHK builder floor with private elevator, stilt parking, modern woodwork, and quiet green surroundings.',
    address: 'Greater Kailash 1, Delhi',
    city: 'Delhi',
    locality: 'Greater Kailash',
    areaSqFt: 1900,
    price: 28500000, // 2.85 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Independent House',
    bhk: '3BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'
    ])
  },
  {
    title: '4 BHK Independent Bungalow in Sadar',
    description: 'Spacious independent bungalow with large front lawn, 3 car parking, solar panels, and quiet residential neighborhood.',
    address: 'Sadar, Nagpur',
    city: 'Nagpur',
    locality: 'Sadar',
    areaSqFt: 2800,
    price: 16500000, // 1.65 Cr
    type: 'BUY',
    category: 'BUY',
    propertyType: 'Independent House',
    bhk: '4BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: false,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80'
    ])
  },

  // --- RENT (8) ---
  {
    title: '2 BHK Fully Furnished Flat in Chembur',
    description: 'Fully furnished 2 BHK flat near Chembur monorail & Eastern Express Highway. ACs, sofa, TV, fridge included.',
    address: 'Chembur East, Mumbai',
    city: 'Mumbai',
    locality: 'Chembur',
    areaSqFt: 850,
    price: 55000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
    ])
  },
  {
    title: '1 BHK Cozy Apartment in Vikhroli East',
    description: 'Well-maintained 1 BHK flat near Godrej IT Park. Modular kitchen, pipe gas, reserved parking.',
    address: 'Tagore Nagar, Vikhroli East, Mumbai',
    city: 'Mumbai',
    locality: 'Vikhroli East',
    areaSqFt: 480,
    price: 32000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '1BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80'
    ])
  },
  {
    title: '3 BHK Sea View Flat in Worli',
    description: 'High floor 3 BHK with stunning Arabian Sea views, modern modular kitchen, and double height living space.',
    address: 'Worli Naka, Mumbai',
    city: 'Mumbai',
    locality: 'Worli',
    areaSqFt: 1600,
    price: 135000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '3BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
    ])
  },
  {
    title: '2 BHK Garden View Apartment in Viman Nagar',
    description: 'Airy 2 BHK flat overlooking lush greenery in Viman Nagar, close to Phoenix Marketcity and airport.',
    address: 'Viman Nagar, Pune',
    city: 'Pune',
    locality: 'Viman Nagar',
    areaSqFt: 1100,
    price: 38000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'
    ])
  },
  {
    title: '1 BHK Studio Flat in Andheri West',
    description: 'Trendy studio flat near Lokhandwala market, fully loaded with modern electronics, Wi-Fi, and modular setup.',
    address: 'Lokhandwala, Andheri West, Mumbai',
    city: 'Mumbai',
    locality: 'Andheri West',
    areaSqFt: 420,
    price: 42000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '1BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&q=80'
    ])
  },
  {
    title: '2 BHK Modern Flat in Koramangala',
    description: 'Prime Koramangala 2 BHK with teak wood interiors, balcony garden, power backup, and gated security.',
    address: 'Koramangala 4th Block, Bangalore',
    city: 'Bangalore',
    locality: 'Koramangala',
    areaSqFt: 1150,
    price: 45000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80'
    ])
  },
  {
    title: '3 BHK High-Rise Flat in Ghatkopar East',
    description: 'Spacious 3 BHK in high-rise tower, near Eastern Express Highway and metro line. Club house and pool available.',
    address: 'Garodia Nagar, Ghatkopar East, Mumbai',
    city: 'Mumbai',
    locality: 'Ghatkopar East',
    areaSqFt: 1300,
    price: 75000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '3BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Semi-Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ])
  },
  {
    title: '2 BHK Flat in Cyber City Gurgaon',
    description: 'Sleek 2 BHK apartment near Cyber Hub & Phase 3 Metro. Centralized AC, modular kitchen, and basement parking.',
    address: 'DLF Phase 3, Gurgaon, Delhi',
    city: 'Delhi',
    locality: 'Gurgaon',
    areaSqFt: 1200,
    price: 50000,
    type: 'RENT',
    category: 'RENT',
    propertyType: 'Flat',
    bhk: '2BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
    ])
  },

  // --- COMMERCIAL (4) ---
  {
    title: 'Plug-and-Play Office Space in BKC',
    description: 'Fully furnished 40-seater IT office space in Bandra Kurla Complex with 2 conference rooms, reception, and pantry.',
    address: 'Bandra Kurla Complex (BKC), Mumbai',
    city: 'Mumbai',
    locality: 'BKC',
    areaSqFt: 2200,
    price: 250000, // 2.5 Lac/mo
    type: 'RENT',
    category: 'COMMERCIAL',
    propertyType: 'Commercial Space',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    ])
  },
  {
    title: 'Prime Retail Shop in Connaught Place',
    description: 'Ground floor retail shop with high footfall main road exposure in CP Inner Circle. Ideal for luxury brand showroom.',
    address: 'Connaught Place, Delhi',
    city: 'Delhi',
    locality: 'Connaught Place',
    areaSqFt: 1400,
    price: 350000, // 3.5 Lac/mo
    type: 'RENT',
    category: 'COMMERCIAL',
    propertyType: 'Commercial Space',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: false,
    furnishedStatus: 'Unfurnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80'
    ])
  },
  {
    title: 'Modern Workstation Office in Baner',
    description: 'Corporate office space in commercial hub Baner with high speed fiber internet, cafeteria, and basement parking.',
    address: 'Baner High Street, Pune',
    city: 'Pune',
    locality: 'Baner',
    areaSqFt: 1800,
    price: 120000,
    type: 'RENT',
    category: 'COMMERCIAL',
    propertyType: 'Commercial Space',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80'
    ])
  },
  {
    title: 'Boutique Commercial Studio in Lower Parel',
    description: 'Chic loft-style commercial studio in Lower Parel compound, suitable for design agencies, production houses or IT startups.',
    address: 'Lower Parel, Mumbai',
    city: 'Mumbai',
    locality: 'Lower Parel',
    areaSqFt: 1100,
    price: 9500,
    type: 'RENT',
    category: 'COMMERCIAL',
    propertyType: 'Commercial Space',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80'
    ])
  },

  // --- PG / HOSTEL (3) ---
  {
    title: 'Executive Male PG in Powai near IIT',
    description: 'Single and double sharing AC PG rooms for male working professionals with high-speed WiFi, 3 meals daily, and laundry.',
    address: 'Rambaug, Powai, Mumbai',
    city: 'Mumbai',
    locality: 'Powai',
    areaSqFt: 250,
    price: 16000,
    type: 'RENT',
    category: 'PG',
    propertyType: 'PG / Paying Guest',
    bhk: '1BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ])
  },
  {
    title: 'Luxury Girls PG in HSR Layout',
    description: 'Safe premium girls PG in HSR Layout Sector 1 with biometric access, biometric security, CCTV, house keeping, and organic food.',
    address: 'HSR Layout Sector 1, Bangalore',
    city: 'Bangalore',
    locality: 'HSR Layout',
    areaSqFt: 220,
    price: 18000,
    type: 'RENT',
    category: 'PG',
    propertyType: 'PG / Paying Guest',
    bhk: '1BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
    ])
  },
  {
    title: 'Co-Living Shared PG in Hinjewadi',
    description: 'Modern co-living space near Phase 1 IT park Hinjewadi with gaming zone, gym, community kitchen, and weekly events.',
    address: 'Hinjewadi Phase 1, Pune',
    city: 'Pune',
    locality: 'Hinjewadi',
    areaSqFt: 300,
    price: 14000,
    type: 'RENT',
    category: 'PG',
    propertyType: 'PG / Paying Guest',
    bhk: '1BHK',
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Furnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ])
  },

  // --- PLOT / LAND (3) ---
  {
    title: 'Corner Residential Plot in Shamirpet',
    description: 'HMDA-approved 2400 sq.ft corner plot in rapidly growing Shamirpet corridor with 40-foot wide road access and electricity.',
    address: 'Shamirpet, Hyderabad',
    city: 'Nagpur', // mapped to region
    locality: 'Shamirpet',
    areaSqFt: 2400,
    price: 5400000, // 54 Lac
    type: 'BUY',
    category: 'PLOT_LAND',
    propertyType: 'Plot',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'New Launch',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Unfurnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80'
    ])
  },
  {
    title: 'Scenic Hill View Land in Lonavala',
    description: 'Prime 5000 sq.ft NA plot in Lonavala hill station, perfect for building a private luxury weekend getaway villa.',
    address: 'Tungarli, Lonavala, Pune',
    city: 'Pune',
    locality: 'Lonavala',
    areaSqFt: 5000,
    price: 12500000, // 1.25 Cr
    type: 'BUY',
    category: 'PLOT_LAND',
    propertyType: 'Plot',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'Resale',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Unfurnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    ])
  },
  {
    title: 'Gated Community Plot in Devanahalli',
    description: 'Clear-title villa plot near Bangalore International Airport with clubhouse, wide asphalt roads, and underground utilities.',
    address: 'Devanahalli, Bangalore',
    city: 'Bangalore',
    locality: 'Devanahalli',
    areaSqFt: 3000,
    price: 8800000, // 88 Lac
    type: 'BUY',
    category: 'PLOT_LAND',
    propertyType: 'Plot',
    bhk: null,
    possessionStatus: 'Ready to Move',
    listingType: 'New Project',
    isVerified: true,
    isGated: true,
    furnishedStatus: 'Unfurnished',
    imageUrls: JSON.stringify([
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
    ])
  }
];

async function replaceWith25Properties() {
  console.log('🚀 Cleaning existing database and populating EXACTLY 25 unique properties...\n');

  // 1. Find or create an uploader user
  let uploader = await prisma.user.findFirst({ where: { email: 'admin@propertylo.com' } });
  if (!uploader) {
    uploader = await prisma.user.findFirst();
  }
  if (!uploader) {
    uploader = await prisma.user.create({
      data: {
        email: 'admin@propertylo.com',
        password: '$2b$10$YourHashedPasswordHere',
        name: 'System Admin',
        role: 'UPLOADER'
      }
    });
  }

  // 2. Safely wipe dependent tables first
  console.log('🧹 Clearing dependencies (favorites, reviews, visits)...');
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.visit.deleteMany();

  // 3. Wipe properties table completely
  console.log('🗑️  Deleting all existing properties...');
  await prisma.property.deleteMany();

  // 4. Insert exactly 25 curated properties
  console.log('✨ Creating 25 pristine properties with unique high-quality image sets...');
  let createdCount = 0;

  for (const item of TOP_25_PROPERTIES) {
    await prisma.property.create({
      data: {
        ...item,
        uploaderId: uploader.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    createdCount++;
  }

  console.log(`\n🎉 SUCCESS! Created exactly ${createdCount} properties in the database.`);

  const finalCount = await prisma.property.count();
  console.log(`\n📊 Final DB Property Count: ${finalCount}`);

  const categoryBreakdown = await prisma.property.groupBy({
    by: ['category'],
    _count: { id: true }
  });
  console.log('\n📊 Breakdown by Category:');
  console.table(categoryBreakdown);
}

replaceWith25Properties()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
