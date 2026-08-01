import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const INPUT_FILE = path.join(process.cwd(), 'data', 'scraped-products.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'assets', 'products');

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Input file not found: ${INPUT_FILE}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Found ${data.length} products to process...`);

  for (const product of data) {
    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        const imageUrl = product.images[i];
        
        // Skip dummy images for the script run, unless we actually want to download them
        if (imageUrl.includes('picsum.photos')) {
           console.log(`Skipping placeholder image: ${imageUrl}`);
           continue; 
        }

        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `${product.slug}-${i + 1}${ext}`;
        const dest = path.join(OUTPUT_DIR, filename);

        console.log(`Downloading ${imageUrl} -> ${filename}`);
        try {
          await downloadImage(imageUrl, dest);
          // Optional: Update the JSON to point to the local asset
          // product.images[i] = `/assets/products/${filename}`;
        } catch (err) {
          console.error(`Failed to download ${imageUrl}:`, err.message);
        }
      }
    }
  }
  
  // If we updated the JSON, we should write it back out here.
  // fs.writeFileSync(INPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Download complete.');
}

run();
