/*
  # Create Articles and Categories System

  ## 1. New Tables
    
  ### `categories`
    - `id` (uuid, primary key)
    - `name` (text, unique) - Category name (Pets, Health, AI)
    - `slug` (text, unique) - URL-friendly version
    - `description` (text) - Category description
    - `created_at` (timestamptz) - Creation timestamp
    
  ### `articles`
    - `id` (uuid, primary key)
    - `title` (text) - Article title
    - `slug` (text, unique) - URL-friendly version
    - `description` (text) - Short description for preview
    - `content` (text) - Full article content
    - `image_url` (text) - Article hero image URL
    - `category_id` (uuid, foreign key) - Reference to categories
    - `published` (boolean) - Publication status
    - `featured` (boolean) - Show on homepage
    - `created_at` (timestamptz) - Creation timestamp
    - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
    - Enable RLS on all tables
    - Public read access for published articles and categories
    - Authenticated users can manage articles (for admin panel)
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO categories (name, slug, description) VALUES
  ('Pets', 'pets', 'Everything about pets, care, and animal companions'),
  ('Health', 'health', 'Health tips, wellness, and medical information'),
  ('AI', 'ai', 'Artificial Intelligence news, trends, and insights')
ON CONFLICT (name) DO NOTHING;

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Understanding Your Pet''s Behavior',
  'understanding-pet-behavior',
  'Learn to decode your pet''s body language and behavior patterns for a stronger bond.',
  '<h2>Introduction</h2><p>Understanding your pet''s behavior is crucial for building a strong, healthy relationship. Animals communicate through body language, vocalizations, and actions.</p><h2>Common Behaviors</h2><p>From tail wagging to ear positioning, every movement tells a story. Learning these signals helps you respond appropriately to your pet''s needs.</p><h2>Building Trust</h2><p>Consistent, positive interactions based on understanding lead to a deeper bond with your pet.</p>',
  'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'pets'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'understanding-pet-behavior');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'The Benefits of Regular Exercise',
  'benefits-regular-exercise',
  'Discover how regular physical activity transforms your health and wellbeing.',
  '<h2>Physical Benefits</h2><p>Regular exercise strengthens your cardiovascular system, builds muscle, and improves flexibility. It''s one of the most effective ways to prevent chronic diseases.</p><h2>Mental Health</h2><p>Exercise releases endorphins, reducing stress and anxiety while boosting mood and cognitive function.</p><h2>Getting Started</h2><p>Start small and build consistency. Even 20 minutes of daily activity makes a significant difference.</p>',
  'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'health'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'benefits-regular-exercise');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'AI in Healthcare: The Future is Now',
  'ai-healthcare-future',
  'How artificial intelligence is revolutionizing medical diagnosis and treatment.',
  '<h2>Transforming Diagnostics</h2><p>AI algorithms can now detect diseases from medical images with accuracy matching or exceeding human experts. This technology is saving lives through early detection.</p><h2>Personalized Medicine</h2><p>Machine learning analyzes patient data to create tailored treatment plans, improving outcomes and reducing side effects.</p><h2>The Road Ahead</h2><p>As AI continues to evolve, we''re entering an era of unprecedented medical capabilities.</p>',
  'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'ai'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'ai-healthcare-future');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Nutrition Tips for Your Dog',
  'dog-nutrition-tips',
  'Essential nutrition guidelines to keep your dog healthy and energetic.',
  '<h2>Balanced Diet Essentials</h2><p>Dogs need a balanced mix of proteins, fats, carbohydrates, vitamins, and minerals. Quality dog food provides these nutrients in proper proportions.</p><h2>Foods to Avoid</h2><p>Chocolate, grapes, onions, and certain other human foods can be toxic to dogs. Always research before sharing your meals.</p><h2>Portion Control</h2><p>Overfeeding leads to obesity and health problems. Follow feeding guidelines based on your dog''s size and activity level.</p>',
  'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'pets'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'dog-nutrition-tips');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Mental Wellness in the Digital Age',
  'mental-wellness-digital-age',
  'Strategies for maintaining mental health in our hyper-connected world.',
  '<h2>Digital Overwhelm</h2><p>Constant connectivity can lead to stress, anxiety, and burnout. Recognizing the signs is the first step to better mental health.</p><h2>Healthy Boundaries</h2><p>Set limits on screen time, create tech-free zones, and practice digital detoxes regularly.</p><h2>Mindfulness Practices</h2><p>Meditation, deep breathing, and present-moment awareness help counter digital stress and restore mental balance.</p>',
  'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'health'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'mental-wellness-digital-age');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Machine Learning Basics Explained',
  'machine-learning-basics',
  'A beginner-friendly introduction to machine learning concepts and applications.',
  '<h2>What is Machine Learning?</h2><p>Machine learning is a subset of AI that enables computers to learn from data without explicit programming. It''s behind many technologies we use daily.</p><h2>Types of Learning</h2><p>Supervised learning uses labeled data, unsupervised learning finds patterns independently, and reinforcement learning learns through trial and error.</p><h2>Real-World Applications</h2><p>From recommendation systems to autonomous vehicles, machine learning is reshaping every industry.</p>',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'ai'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'machine-learning-basics');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Cat Care Essentials for New Owners',
  'cat-care-essentials',
  'Everything you need to know about caring for your new feline friend.',
  '<h2>Creating a Safe Space</h2><p>Cats need their own territory with hiding spots, perches, and quiet areas. Set up a comfortable environment before bringing your cat home.</p><h2>Health and Grooming</h2><p>Regular vet checkups, proper nutrition, and grooming routines keep your cat healthy and happy.</p><h2>Understanding Cat Behavior</h2><p>Cats communicate through body language, vocalizations, and scent marking. Learn to read these signals for better bonding.</p>',
  'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'pets'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'cat-care-essentials');

INSERT INTO articles (title, slug, description, content, image_url, category_id, published, featured)
SELECT 
  'Sleep Science: Why Rest Matters',
  'sleep-science-importance',
  'The critical role of quality sleep in physical and mental health.',
  '<h2>The Sleep Cycle</h2><p>Sleep progresses through multiple stages, each serving crucial functions for body repair, memory consolidation, and hormone regulation.</p><h2>Health Consequences</h2><p>Chronic sleep deprivation increases risks of obesity, diabetes, heart disease, and mental health issues.</p><h2>Better Sleep Habits</h2><p>Maintain consistent schedules, create a dark cool environment, and limit screen time before bed for optimal rest.</p>',
  'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?auto=compress&cs=tinysrgb&w=1200',
  (SELECT id FROM categories WHERE slug = 'health'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'sleep-science-importance');
