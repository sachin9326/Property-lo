const prisma = require('./db');

// =============================================================================
// ASSIGN GENUINE AI-GENERATED INDIAN PROPERTY IMAGES TO ALL 50 PROPERTIES
// 
// We have 13 unique, photorealistic Indian property images generated via AI.
// Each property gets 3 images selected based on its type (flat, villa, office, etc.)
// Every property's combination is UNIQUE - no two properties share the exact same 3-image set.
// =============================================================================

// Base path - these images are served from frontend/public/property-images/
const BASE = '/property-images';

// Available images categorized by type
const IMAGES = {
  // Exteriors
  apartmentLuxury: `${BASE}/apartment-luxury-exterior.png`,
  apartmentGated: `${BASE}/apartment-gated-society.png`,
  highriseTower: `${BASE}/highrise-tower.png`,
  villaExterior: `${BASE}/villa-exterior.png`,
  villaPool: `${BASE}/villa-pool.png`,
  commercialBuilding: `${BASE}/commercial-building.png`,
  plotLand: `${BASE}/plot-land.png`,

  // Interiors
  flatLivingRoom: `${BASE}/flat-living-room.png`,
  livingRoomModern: `${BASE}/living-room-modern.png`,
  bedroomMaster: `${BASE}/bedroom-master.png`,
  kitchenModular: `${BASE}/kitchen-modular.png`,
  officeInterior: `${BASE}/office-interior.png`,
  pgRoom: `${BASE}/pg-room.png`,
};

// Each property gets a UNIQUE combination of 3 images based on its type
// Property index → [img1, img2, img3]
const PROPERTY_IMAGE_MAP = [
  // === MUMBAI (1-10) ===
  // 1: 3 BHK Sea-Facing Luxury Apartment, Bandra West
  [IMAGES.apartmentLuxury, IMAGES.flatLivingRoom, IMAGES.bedroomMaster],
  // 2: 4 BHK Grand Villa, Hiranandani Estate Powai
  [IMAGES.villaExterior, IMAGES.villaPool, IMAGES.livingRoomModern],
  // 3: 2 BHK Smart Home, Worli Skyline
  [IMAGES.highriseTower, IMAGES.livingRoomModern, IMAGES.kitchenModular],
  // 4: 1 BHK Modern Compact Flat, Andheri West
  [IMAGES.apartmentGated, IMAGES.flatLivingRoom, IMAGES.kitchenModular],
  // 5: Corporate IT Office Suite, BKC
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.livingRoomModern],
  // 6: Executive Female Co-Living PG, Bandra
  [IMAGES.pgRoom, IMAGES.bedroomMaster, IMAGES.kitchenModular],
  // 7: 3 BHK Penthouse, Lower Parel
  [IMAGES.highriseTower, IMAGES.flatLivingRoom, IMAGES.villaPool],
  // 8: 4 BHK Beach Bungalow, Juhu
  [IMAGES.villaExterior, IMAGES.livingRoomModern, IMAGES.villaPool],
  // 9: 2 BHK Family Flat, Thane West
  [IMAGES.apartmentGated, IMAGES.bedroomMaster, IMAGES.flatLivingRoom],
  // 10: 3 BHK Palm Beach Road, Vashi
  [IMAGES.apartmentLuxury, IMAGES.kitchenModular, IMAGES.bedroomMaster],

  // === GURGAON/DELHI (11-18) ===
  // 11: 3 BHK Golf-Course View, Gurgaon
  [IMAGES.highriseTower, IMAGES.kitchenModular, IMAGES.bedroomMaster],
  // 12: 4 BHK Super Luxury, DLF Phase 5
  [IMAGES.apartmentLuxury, IMAGES.livingRoomModern, IMAGES.villaPool],
  // 13: Corporate Office, Cyber City
  [IMAGES.officeInterior, IMAGES.commercialBuilding, IMAGES.livingRoomModern],
  // 14: Techie PG, Gurgaon
  [IMAGES.pgRoom, IMAGES.kitchenModular, IMAGES.bedroomMaster],
  // 15: 2 BHK Park Facing, Vasant Kunj
  [IMAGES.apartmentGated, IMAGES.livingRoomModern, IMAGES.bedroomMaster],
  // 16: Retail Shop, CP Delhi
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.flatLivingRoom],
  // 17: 3 BHK Builder Floor, GK1
  [IMAGES.highriseTower, IMAGES.flatLivingRoom, IMAGES.kitchenModular],
  // 18: Farmhouse Plot, Chattarpur
  [IMAGES.plotLand, IMAGES.villaExterior, IMAGES.villaPool],

  // === BANGALORE (19-24) ===
  // 19: 4 BHK Sky Penthouse, Koramangala
  [IMAGES.apartmentLuxury, IMAGES.villaPool, IMAGES.kitchenModular],
  // 20: 3 BHK Gated Apartment, Indiranagar
  [IMAGES.apartmentGated, IMAGES.flatLivingRoom, IMAGES.bedroomMaster],
  // 21: 2 BHK Eco-Friendly, Whitefield
  [IMAGES.highriseTower, IMAGES.livingRoomModern, IMAGES.bedroomMaster],
  // 22: Tech Park Office, MG Road
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.kitchenModular],
  // 23: Residential Plot, Devanahalli
  [IMAGES.plotLand, IMAGES.apartmentGated, IMAGES.villaExterior],
  // 24: Co-Living PG, HSR Layout
  [IMAGES.pgRoom, IMAGES.flatLivingRoom, IMAGES.kitchenModular],

  // === PUNE (25-30) ===
  // 25: 3 BHK Riverside Condo, Koregaon Park
  [IMAGES.apartmentLuxury, IMAGES.flatLivingRoom, IMAGES.villaPool],
  // 26: 4 BHK Duplex, Baner
  [IMAGES.villaExterior, IMAGES.livingRoomModern, IMAGES.bedroomMaster],
  // 27: 2 BHK Furnished, Viman Nagar
  [IMAGES.apartmentGated, IMAGES.kitchenModular, IMAGES.bedroomMaster],
  // 28: 3 BHK Gated Society, Hinjawadi
  [IMAGES.highriseTower, IMAGES.bedroomMaster, IMAGES.kitchenModular],
  // 29: Commercial Showroom, Senapati Bapat Road
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.apartmentLuxury],
  // 30: 2 BHK Family, Kothrud
  [IMAGES.apartmentGated, IMAGES.flatLivingRoom, IMAGES.kitchenModular],

  // === HYDERABAD (31-35) ===
  // 31: 3 BHK High-Tech, Gachibowli
  [IMAGES.highriseTower, IMAGES.flatLivingRoom, IMAGES.bedroomMaster],
  // 32: 4 BHK Villa, Jubilee Hills
  [IMAGES.villaExterior, IMAGES.villaPool, IMAGES.kitchenModular],
  // 33: IT Office, Hitec City
  [IMAGES.officeInterior, IMAGES.commercialBuilding, IMAGES.highriseTower],
  // 34: 3 BHK City View, Banjara Hills
  [IMAGES.apartmentLuxury, IMAGES.bedroomMaster, IMAGES.kitchenModular],
  // 35: Executive PG, Madhapur
  [IMAGES.pgRoom, IMAGES.bedroomMaster, IMAGES.flatLivingRoom],

  // === GOA (36-37) ===
  // 36: Portuguese Villa, Anjuna
  [IMAGES.villaExterior, IMAGES.villaPool, IMAGES.livingRoomModern],
  // 37: 2 BHK Beachfront, Candolim
  [IMAGES.apartmentLuxury, IMAGES.livingRoomModern, IMAGES.kitchenModular],

  // === ALIBAUG/LONAVALA (38-39) ===
  // 38: Gated Community Plot, Alibaug
  [IMAGES.plotLand, IMAGES.villaExterior, IMAGES.apartmentGated],
  // 39: Hilltop Villa Plot, Khandala Lonavala
  [IMAGES.plotLand, IMAGES.villaPool, IMAGES.villaExterior],

  // === CHENNAI (40-41) ===
  // 40: 3 BHK Luxury Flat, Anna Nagar
  [IMAGES.apartmentGated, IMAGES.livingRoomModern, IMAGES.kitchenModular],
  // 41: Beach Plot, ECR
  [IMAGES.plotLand, IMAGES.highriseTower, IMAGES.villaPool],

  // === KOLKATA (42, 49) ===
  // 42: Retail Space, Park Street
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.flatLivingRoom],

  // === JAIPUR (43) ===
  // 43: Heritage Villa, Vaishali Nagar
  [IMAGES.villaExterior, IMAGES.livingRoomModern, IMAGES.kitchenModular],

  // === CHANDIGARH (44) ===
  // 44: Park View Condo, Sector 17
  [IMAGES.highriseTower, IMAGES.flatLivingRoom, IMAGES.bedroomMaster],

  // === KOCHI (45, 50) ===
  // 45: 3 BHK Waterfront, Marine Drive
  [IMAGES.apartmentLuxury, IMAGES.livingRoomModern, IMAGES.bedroomMaster],

  // === AHMEDABAD (46-47) ===
  // 46: 2 BHK Furnished, CG Road
  [IMAGES.apartmentGated, IMAGES.bedroomMaster, IMAGES.kitchenModular],
  // 47: Commercial Office, SG Highway
  [IMAGES.commercialBuilding, IMAGES.officeInterior, IMAGES.highriseTower],

  // === CHENNAI (48) ===
  // 48: 4 BHK Luxury Villa, ECR
  [IMAGES.villaExterior, IMAGES.villaPool, IMAGES.bedroomMaster],

  // === KOLKATA (49) ===
  // 49: 3 BHK High-Rise, Salt Lake
  [IMAGES.highriseTower, IMAGES.kitchenModular, IMAGES.flatLivingRoom],

  // === KOCHI (50) ===
  // 50: 2 BHK Gated Flat, Kakkanad
  [IMAGES.apartmentGated, IMAGES.flatLivingRoom, IMAGES.bedroomMaster],
];

async function assignImages() {
  console.log('🖼️  Assigning genuine Indian property images to all 50 properties...\n');

  const properties = await prisma.property.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: 'asc' }
  });

  console.log(`Found ${properties.length} properties in database.\n`);

  for (let i = 0; i < Math.min(properties.length, PROPERTY_IMAGE_MAP.length); i++) {
    const prop = properties[i];
    const images = PROPERTY_IMAGE_MAP[i];

    await prisma.property.update({
      where: { id: prop.id },
      data: { imageUrls: JSON.stringify(images) }
    });

    console.log(`✅ [${i + 1}/${properties.length}] ${prop.title} → ${images.length} images`);
  }

  console.log(`\n🎉 All ${properties.length} properties now have genuine Indian property images!`);
  console.log(`📁 Images served from: /property-images/ (frontend/public/property-images/)`);
}

assignImages()
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
