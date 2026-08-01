const fs = require('fs');
const path = require('path');

async function scrape() {
  try {
    console.log('Fetching products...');
    const res = await fetch('https://jkthcdistro.com/collections/disposables/products.json?limit=250');
    const data = await res.json();
    
    const products = data.products.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.handle,
      basePrice: parseFloat(p.variants[0].compare_at_price || p.variants[0].price || 0),
      discountPrice: p.variants[0].compare_at_price ? parseFloat(p.variants[0].price) : null,
      images: p.images.map(img => img.src),
      rating: 4.8 + (Math.random() * 0.2), // Mock rating
      reviews: Math.floor(Math.random() * 200) + 10,
      vendor: p.vendor,
      tags: p.tags
    }));

    // Save to data directory
    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
    fs.writeFileSync(path.join(dir, 'scraped-products.json'), JSON.stringify(products, null, 2));
    console.log(`Saved ${products.length} products to data/scraped-products.json`);
  } catch (err) {
    console.error('Error scraping products:', err);
  }
}

scrape();
