/*
  # Add Fashion Category and Sample Articles

  ## Changes
    - Insert Fashion category into categories table
    - Add 8 fashion articles with various topics
    - All articles are published and some are featured
*/

INSERT INTO categories (name, slug, description) VALUES
  ('Fashion', 'fashion', 'Latest fashion trends, style tips, and wardrobe essentials')
ON CONFLICT (name) DO NOTHING;

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Minimalist Fashion: Less is More',
  'minimalist-fashion-less-is-more',
  'Discover how minimalism can transform your wardrobe and simplify your daily style choices.',
  '<h2>What is Minimalist Fashion?</h2><p>Minimalist fashion is about quality over quantity, focusing on essential pieces that work together seamlessly.</p><h2>Building a Capsule Wardrobe</h2><p>Start with neutral colors and classic cuts. Invest in quality basics that can be mixed and matched effortlessly.</p><h2>Benefits</h2><p>A minimalist wardrobe saves time, money, and reduces decision fatigue. It''s sustainable and timeless.</p>',
  'https://images.pexels.com/photos/3769713/pexels-photo-3769713.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'minimalist-fashion-less-is-more');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Sustainable Fashion: Dressing Ethically',
  'sustainable-fashion-dressing-ethically',
  'Learn how to make fashion choices that benefit both you and the environment.',
  '<h2>Understanding Sustainable Fashion</h2><p>Sustainable fashion considers the environmental and social impact of clothing production.</p><h2>How to Shop Sustainably</h2><p>Look for eco-friendly materials, support ethical brands, and buy less but better quality pieces.</p><h2>Second-hand Shopping</h2><p>Thrift stores and clothing swaps are great ways to refresh your wardrobe sustainably.</p>',
  'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'sustainable-fashion-dressing-ethically');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Color Theory in Fashion',
  'color-theory-in-fashion',
  'Master the art of color coordination to create stunning outfits effortlessly.',
  '<h2>Understanding Color Harmony</h2><p>Color theory helps you create visually appealing outfits by understanding how colors interact.</p><h2>Color Combinations</h2><p>Complementary colors create contrast, while analogous colors provide harmony. Learn which palettes suit your skin tone.</p><h2>Seasonal Palettes</h2><p>Different seasons inspire different color palettes. Experiment to find what makes you feel confident.</p>',
  'https://images.pexels.com/photos/3637725/pexels-photo-3637725.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'color-theory-in-fashion');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Denim Styling Guide: Endless Possibilities',
  'denim-styling-guide',
  'From casual to formal, explore the versatility of denim in your wardrobe.',
  '<h2>Denim Basics</h2><p>Quality denim is a wardrobe staple. Invest in a well-fitting pair that matches your body type.</p><h2>Styling Ideas</h2><p>Pair jeans with blazers for a professional look, or with tees for casual comfort. Experiment with different washes.</p><h2>Care and Maintenance</h2><p>Proper care extends denim longevity. Wash infrequently and air dry to preserve color and fit.</p>',
  'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'denim-styling-guide');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Accessory Game: Elevate Your Look',
  'accessory-game-elevate-your-look',
  'Learn how the right accessories can completely transform any outfit.',
  '<h2>Jewelry Basics</h2><p>Choose jewelry that complements your personal style and skin tone. Mixing metals is trendy and versatile.</p><h2>Bags and Belts</h2><p>A quality bag is both functional and fashionable. Belts can define your silhouette and add visual interest.</p><h2>Shoes Matter</h2><p>Good shoes ground an outfit. Invest in quality basics and then explore statement pieces.</p>',
  'https://images.pexels.com/photos/2311847/pexels-photo-2311847.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'accessory-game-elevate-your-look');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Fashion Trends Spring/Summer 2026',
  'fashion-trends-spring-summer-2026',
  'Discover the hottest trends for the upcoming season.',
  '<h2>Silhouettes</h2><p>Expect flowing fabrics, oversized fits, and unique cuts. Comfort meets style this season.</p><h2>Colors and Patterns</h2><p>Pastel tones, bold prints, and earth tones dominate the season. Mix and match patterns fearlessly.</p><h2>Must-Have Pieces</h2><p>Linen shirts, wide-leg trousers, and statement jackets are essential for this season''s looks.</p>',
  'https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'fashion-trends-spring-summer-2026');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Building Your Personal Brand Through Style',
  'building-personal-brand-through-style',
  'Express your unique identity and values through intentional fashion choices.',
  '<h2>Understanding Your Style</h2><p>Reflect on your lifestyle, values, and personality. Your style should tell your story.</p><h2>Creating Consistency</h2><p>Develop signature pieces and a consistent color palette that makes you easily recognizable.</p><h2>Authenticity</h2><p>Fashion is about self-expression. Wear what makes you feel confident and comfortable.</p>',
  'https://images.pexels.com/photos/3769713/pexels-photo-3769713.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'building-personal-brand-through-style');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Layering for Every Season',
  'layering-for-every-season',
  'Master the art of layering to stay comfortable and stylish year-round.',
  '<h2>Summer Layering</h2><p>Lightweight fabrics like linen and cotton are perfect for hot weather. Layer loose pieces for airflow.</p><h2>Winter Essentials</h2><p>Thermal bases, sweaters, and coats create dimension. Choose textures that complement each other.</p><h2>Transition Seasons</h2><p>Light jackets, cardigans, and structured pieces work well during spring and fall.</p>',
  'https://images.pexels.com/photos/3637725/pexels-photo-3637725.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'fashion'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'layering-for-every-season');
