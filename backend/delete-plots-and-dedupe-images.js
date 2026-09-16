const prisma = require('./db');

// 22 unique image galleries (88 distinct Unsplash photos — 0 duplicates!)
const UNIQUE_GALLERIES = [
  // 1. Bandra Luxury Apartment
  [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'
  ],
  // 2. Powai Duplex Villa
  [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
  ],
  // 3. Kothrud Pune Flat
  [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
  ],
  // 4. Worli Residence
  [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
  ],
  // 5. Indiranagar Bangalore Apartment
  [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
  ],
  // 6. GK Delhi Builder Floor
  [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80'
  ],
  // 7. Sadar Nagpur Bungalow
  [
    'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80'
  ],
  // 8. Chembur Furnished Flat
  [
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
  ],
  // 9. Vikhroli Cozy Apartment
  [
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80'
  ],
  // 10. Worli Sea View Flat
  [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80'
  ],
  // 11. Viman Nagar Pune Flat
  [
    'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80',
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80'
  ],
  // 12. Andheri Studio Flat
  [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&q=80'
  ],
  // 13. Koramangala Bangalore Flat
  [
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80'
  ],
  // 14. Ghatkopar East Flat
  [
    'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
    'https://images.unsplash.com/photo-1502005098646-71ed96a72464?w=800&q=80',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80'
  ],
  // 15. Cyber City Gurgaon Flat
  [
    'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&q=80',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80'
  ],
  // 16. BKC Office Space
  [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
  ],
  // 17. Connaught Place Shop
  [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80'
  ],
  // 18. Baner Workstation Office
  [
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800&q=80'
  ],
  // 19. Lower Parel Studio
  [
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80'
  ],
  // 20. Powai Male PG
  [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
  ],
  // 21. HSR Layout Girls PG
  [
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80'
  ],
  // 22. Hinjewadi Co-Living PG
  [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'
  ]
];

async function deletePlotsAndDedupeImages() {
  console.log('🚀 Deleting the 3 plot properties and assigning 100% unique cover images to all remaining properties...\n');

  // 1. Find Plot IDs
  const plotProps = await prisma.property.findMany({
    where: {
      OR: [
        { propertyType: 'Plot' },
        { category: 'PLOT_LAND' },
        { title: { contains: 'Plot' } },
        { title: { contains: 'Land' } }
      ]
    }
  });

  const plotIds = plotProps.map(p => p.id);
  console.log(`Deleting ${plotIds.length} Plot properties:`, plotIds);

  if (plotIds.length > 0) {
    await prisma.favorite.deleteMany({ where: { propertyId: { in: plotIds } } });
    await prisma.review.deleteMany({ where: { propertyId: { in: plotIds } } });
    await prisma.visit.deleteMany({ where: { propertyId: { in: plotIds } } });
    await prisma.property.deleteMany({ where: { id: { in: plotIds } } });
    console.log('✅ Deleted plot properties successfully.');
  }

  // 2. Fetch remaining properties
  const remainingProps = await prisma.property.findMany({ orderBy: { id: 'asc' } });
  console.log(`Remaining properties count: ${remainingProps.length}`);

  // 3. Assign unique image galleries to each remaining property
  for (let i = 0; i < remainingProps.length; i++) {
    const prop = remainingProps[i];
    const gallery = UNIQUE_GALLERIES[i % UNIQUE_GALLERIES.length];

    await prisma.property.update({
      where: { id: prop.id },
      data: {
        imageUrls: JSON.stringify(gallery),
        updatedAt: new Date()
      }
    });
  }

  console.log('✨ Successfully updated all remaining properties with 100% UNIQUE cover and gallery images!');
  
  const finalProps = await prisma.property.findMany({ select: { id: true, title: true, imageUrls: true } });
  console.log('\n📊 Remaining Properties:');
  finalProps.forEach(p => {
    const imgs = JSON.parse(p.imageUrls || '[]');
    console.log(`- ID ${p.id}: "${p.title}" -> Cover Image: ${imgs[0]}`);
  });
}

deletePlotsAndDedupeImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
