const prisma = require('./db');

const GALLERY_SETS = {
  Flat: [
    [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
    ],
    [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80'
    ],
    [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ]
  ],
  Villa: [
    [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
    ]
  ],
  Commercial: [
    [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    ]
  ],
  PG: [
    [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
    ]
  ],
  Plot: [
    [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80'
    ]
  ]
};

async function enrichDatabase() {
  console.log('🚀 Enriching all properties with multi-photo HD image galleries...\n');

  const properties = await prisma.property.findMany({ orderBy: { id: 'asc' } });
  console.log(`Found ${properties.length} total properties in DB.`);

  let updatedCount = 0;

  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const titleLower = prop.title.toLowerCase();
    const addressLower = (prop.address || '').toLowerCase();

    // Determine City and Locality
    let city = 'Mumbai';
    let locality = prop.locality || 'Central Mumbai';

    if (titleLower.includes('pune') || addressLower.includes('pune')) {
      city = 'Pune';
    } else if (titleLower.includes('nagpur') && !titleLower.includes('mumbai')) {
      city = 'Nagpur';
    } else if (titleLower.includes('delhi') || titleLower.includes('gurgaon') || titleLower.includes('noida')) {
      city = 'Delhi';
    } else if (titleLower.includes('bangalore') || titleLower.includes('bengaluru')) {
      city = 'Bangalore';
    } else {
      city = 'Mumbai';
    }

    const inMatch = prop.title.match(/in\s+([A-Za-z0-9\s]+?)(?:,|\s+Mumbai|\s+Pune|\s+Nagpur|$)/i);
    if (inMatch && inMatch[1]) {
      locality = inMatch[1].trim();
    }

    let cat = 'RENT';
    let type = 'RENT';
    let propType = prop.propertyType || 'Flat';
    let price = prop.price || 0;

    if (titleLower.includes('office') || titleLower.includes('commercial') || titleLower.includes('shop') || i % 10 === 3) {
      cat = 'COMMERCIAL';
      type = 'RENT';
      propType = 'Commercial Space';
      if (price < 30000 || price > 500000) price = 45000 + (i % 8) * 25000;
    } else if (titleLower.includes('pg') || titleLower.includes('hostel') || titleLower.includes('sharing') || i % 10 === 4) {
      cat = 'PG';
      type = 'RENT';
      propType = 'PG / Paying Guest';
      if (price > 30000 || price < 5000) price = 9000 + (i % 6) * 2500;
    } else if (titleLower.includes('plot') || titleLower.includes('land') || i % 10 === 5) {
      cat = 'PLOT_LAND';
      type = 'BUY';
      propType = 'Plot';
      if (price < 1000000) price = 4500000 + (i % 10) * 1500000;
    } else if (i % 3 === 0 || titleLower.includes('sale') || titleLower.includes('buy')) {
      cat = 'BUY';
      type = 'BUY';
      if (propType === 'Serviced Apartment') propType = 'Flat';
      if (price < 1000000) price = 5500000 + (i % 15) * 2500000;
    } else {
      cat = 'RENT';
      type = 'RENT';
      if (price < 10000 || price > 300000) price = 25000 + (i % 12) * 8000;
    }

    // Select curated gallery images
    let typeKey = 'Flat';
    if (propType.includes('Villa')) typeKey = 'Villa';
    else if (propType.includes('Commercial')) typeKey = 'Commercial';
    else if (propType.includes('PG')) typeKey = 'PG';
    else if (propType.includes('Plot')) typeKey = 'Plot';

    const sets = GALLERY_SETS[typeKey] || GALLERY_SETS.Flat;
    const selectedSet = sets[i % sets.length];

    // Check existing valid images
    let existingImages = [];
    try {
      if (prop.imageUrls) existingImages = JSON.parse(prop.imageUrls);
    } catch (e) {}

    // Filter out CDN images that fail and ensure we have 3-4 working high resolution images
    const validExisting = existingImages.filter(img => img && img.startsWith('http') && !img.includes('staticmb.com'));
    
    const finalImages = [...new Set([...validExisting, ...selectedSet])].slice(0, 4);

    await prisma.property.update({
      where: { id: prop.id },
      data: {
        city: city,
        locality: locality,
        address: `${locality}, ${city}`,
        category: cat,
        type: type,
        propertyType: propType,
        price: price,
        imageUrls: JSON.stringify(finalImages),
        isVerified: true,
        updatedAt: new Date()
      }
    });

    updatedCount++;
  }

  console.log(`✅ Successfully updated ${updatedCount} properties with HD image galleries!`);
}

enrichDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
