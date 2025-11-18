// backend/seed/seedProductsData.js
// ✅ PURE Node.js (CommonJS). No "export default", only module.exports.

const all_product = [
  // MEN: 1 – 12
  {
    id: 1,
    name: "Dark Yellow Suit",
    image: "http://localhost:4000/images/men1.jpg",
    new_price: 55,
    old_price: 89,
    category: "men",
    description: "Elegant dark yellow suit with a modern tailored fit. Designed for standout occasions, featuring a notch lapel and sleek finish."
  },
  {
    id: 2,
    name: "Brown Full Sleeve Shirt",
    image: "http://localhost:4000/images/men2.webp",
    new_price: 68,
    old_price: 120,
    category: "men",
    description: "Classic brown full sleeve shirt crafted from breathable fabric. Perfect for both office wear and casual styling."
  },
  {
    id: 3,
    name: "Pastel Yellow Suit",
    image: "http://localhost:4000/images/men3.avif",
    new_price: 139,
    old_price: 199,
    category: "men",
    description: "Stylish pastel yellow suit with a soft, refined tone. Tailored for a modern fit, ideal for festive gatherings or summer events."
  },
  {
    id: 4,
    name: "Pastel T-shirt",
    image: "http://localhost:4000/images/men4.avif",
    new_price: 34,
    old_price: 60,
    category: "men",
    description: "Minimal pastel-colored t-shirt crafted from soft cotton. Breathable and lightweight, great for summer or layering."
  },
  {
    id: 5,
    name: "Yellow Jacket",
    image: "http://localhost:4000/images/men5.avif",
    new_price: 75,
    old_price: 102,
    category: "men",
    description: "Sunny yellow zip-up jacket with side pockets. Adds color to your day and keeps you cozy on brisk evenings."
  },
  {
    id: 6,
    name: "Red Color T-shirt",
    image: "http://localhost:4000/images/men6.avif",
    new_price: 29,
    old_price: 55,
    category: "men",
    description: "Solid red classic fit t-shirt. Simple, bold, and easy to pair with just about anything."
  },
  {
    id: 7,
    name: "Printed Half Sleeve Shirt",
    image: "http://localhost:4000/images/men7.avif",
    new_price: 48,
    old_price: 89,
    category: "men",
    description: "Half-sleeve shirt featuring a modern all-over print. Great for smart-casual or party looks."
  },
  {
    id: 8,
    name: "Yellow T-shirt",
    image: "http://localhost:4000/images/men8.avif",
    new_price: 33,
    old_price: 70,
    category: "men",
    description: "Chic yellow t-shirt, ultra-soft and perfect for a pop of color in your wardrobe."
  },
  {
    id: 9,
    name: "Beige Jeans",
    image: "http://localhost:4000/images/men9.jpg",
    new_price: 69,
    old_price: 129,
    category: "men",
    description: "Modern slim-fit beige jeans. Pairs well with both shirts and t-shirts, a year-round essential."
  },
  {
    id: 10,
    name: "White T-shirt",
    image: "http://localhost:4000/images/men10.avif",
    new_price: 35,
    old_price: 62,
    category: "men",
    description: "Classic white crew-neck t-shirt. Wardrobe staple for layering or wearing solo."
  },
  {
    id: 11,
    name: "Multicolor Full Sleeve Shirt",
    image: "http://localhost:4000/images/men11.avif",
    new_price: 56,
    old_price: 110,
    category: "men",
    description: "Vibrant multi-color full sleeve shirt, perfect for celebrations or lively weekends. Easy button up, statement style."
  },
  {
    id: 12,
    name: "Pink Suit",
    image: "http://localhost:4000/images/men12.jpg",
    new_price: 149,
    old_price: 215,
    category: "men",
    description: "Bold pink tailored suit with subtle sheen, for those who dare to stand out at every occasion."
  },

  // WOMEN: 13 – 27
  {
    id: 13,
    name: "Stylish Pink Shirt Short",
    image: "http://localhost:4000/images/women1.avif",
    new_price: 49,
    old_price: 79,
    category: "women",
    description: "A chic pink shirt with a modern short design, perfect for casual outings or office wear."
  },
  {
    id: 14,
    name: "Stylish Yellow Shirt Short",
    image: "http://localhost:4000/images/women2.avif",
    new_price: 42,
    old_price: 69,
    category: "women",
    description: "Bright yellow short shirt, lightweight and soft, ideal for summer days and casual looks."
  },
  {
    id: 15,
    name: "Denim Shirt with Back Print",
    image: "http://localhost:4000/images/women3.avif",
    new_price: 59,
    old_price: 94,
    category: "women",
    description: "Classic denim shirt with trendy back print, makes a stylish statement."
  },
  {
    id: 16,
    name: "Multicolor Jacket",
    image: "http://localhost:4000/images/women4.avif",
    new_price: 85,
    old_price: 140,
    category: "women",
    description: "Colorful jacket with vibrant patterns, designed for a fashionable and comfy fit."
  },
  {
    id: 17,
    name: "Red Jeans",
    image: "http://localhost:4000/images/women5.avif",
    new_price: 65,
    old_price: 109,
    category: "women",
    description: "Slim fit red jeans that add a bold touch to any wardrobe."
  },
  {
    id: 18,
    name: "Fluorescent Full Sleeve Colorless T-Shirt",
    image: "http://localhost:4000/images/women6.avif",
    new_price: 39,
    old_price: 75,
    category: "women",
    description: "Bright neon full sleeve t-shirt with a sleek transparent look."
  },
  {
    id: 19,
    name: "Off-shoulder Knitted Crop Sweater",
    image: "http://localhost:4000/images/women7.avif",
    new_price: 55,
    old_price: 95,
    category: "women",
    description: "Soft knitted crop sweater with an off-the-shoulder design for trendy style."
  },
  {
    id: 20,
    name: "Multicolor Striped Shirt Full Sleeve",
    image: "http://localhost:4000/images/women8.avif",
    new_price: 48,
    old_price: 87,
    category: "women",
    description: "Full sleeve shirt featuring colorful stripes, perfect for casual or workwear."
  },
  {
    id: 21,
    name: "Pink Hoodie",
    image: "http://localhost:4000/images/women9.avif",
    new_price: 60,
    old_price: 115,
    category: "women",
    description: "Cozy pink hoodie to elevate your casual and sporty looks."
  },
  {
    id: 22,
    name: "Short Dark Blue Denim Shirt",
    image: "http://localhost:4000/images/women10.avif",
    new_price: 65,
    old_price: 110,
    category: "women",
    description: "Dark blue denim shirt in a handy short-sleeve cut for versatile styling."
  },
  {
    id: 23,
    name: "Yellow Suit",
    image: "http://localhost:4000/images/women11.avif",
    new_price: 180,
    old_price: 265,
    category: "women",
    description: "Elegant yellow tailored suit for smart and formal occasions."
  },
  {
    id: 24,
    name: "Dark Yellow Short Jacket",
    image: "http://localhost:4000/images/women12.avif",
    new_price: 75,
    old_price: 120,
    category: "women",
    description: "Short, lightweight jacket in deep yellow shade, perfect for fall days."
  },
  {
    id: 25,
    name: "Green Full Sleeve Shirt",
    image: "http://localhost:4000/images/women13.webp",
    new_price: 48,
    old_price: 85,
    category: "women",
    description: "Relaxed fit green full sleeve shirt with button closure."
  },
  {
    id: 26,
    name: "Simple White T-Shirt",
    image: "http://localhost:4000/images/women14.webp",
    new_price: 35,
    old_price: 60,
    category: "women",
    description: "Classic white tee in soft cotton, a versatile wardrobe staple."
  },
  {
    id: 27,
    name: "Light Blue Suit",
    image: "http://localhost:4000/images/women15.webp",
    new_price: 40,
    old_price: 70,
    category: "women",
    description: "Light blue vest with modern cut, perfect for layering in cooler months."
  },

  // KIDS: 28 – 42
  {
    id: 28,
    name: "Yellow Girl Frock",
    image: "http://localhost:4000/images/kid1.avif",
    new_price: 42,
    old_price: 69,
    category: "kid",
    description: "Bright yellow frock for girls, made with soft cotton for comfort."
  },
  {
    id: 29,
    name: "White Girl T-shirt with Print",
    image: "http://localhost:4000/images/kid2.avif",
    new_price: 30,
    old_price: 55,
    category: "kid",
    description: "Cute white printed t-shirt for girls, ideal for playtime."
  },
  {
    id: 30,
    name: "Boys Blue T-shirt",
    image: "http://localhost:4000/images/kid3.jpg",
    new_price: 28,
    old_price: 52,
    category: "kid",
    description: "Comfortable blue t-shirt for boys, casual and stylish."
  },
  {
    id: 31,
    name: "Boys Yellow T-shirt",
    image: "http://localhost:4000/images/kid4.avif",
    new_price: 29,
    old_price: 54,
    category: "kid",
    description: "Bright yellow t-shirt in soft fabric, perfect for kids."
  },
  {
    id: 32,
    name: "Green Hoodie",
    image: "http://localhost:4000/images/kid5.avif",
    new_price: 45,
    old_price: 80,
    category: "kid",
    description: "Warm green hoodie for kids, great for cool weather."
  },
  {
    id: 33,
    name: "Denim Shirt",
    image: "http://localhost:4000/images/kid6.avif",
    new_price: 38,
    old_price: 67,
    category: "kid",
    description: "Stylish denim shirt for kids that pairs well with jeans."
  },
  {
    id: 34,
    name: "Girls T-shirt with Net at Bottom",
    image: "http://localhost:4000/images/kid7.avif",
    new_price: 40,
    old_price: 75,
    category: "kid",
    description: "Adorable girls t-shirt with mesh net detail for flair."
  },
  {
    id: 35,
    name: "Cheque Shirt Boys",
    image: "http://localhost:4000/images/kid8.avif",
    new_price: 35,
    old_price: 65,
    category: "kid",
    description: "Classic checkered shirt for boys with a relaxed fit."
  },
  {
    id: 36,
    name: "Denim Pinafore Dress",
    image: "http://localhost:4000/images/kid9.avif",
    new_price: 50,
    old_price: 90,
    category: "kid",
    description: "Stylish denim pinafore dress for girls, perfect for casual wear."
  },
  {
    id: 37,
    name: "White Frock",
    image: "http://localhost:4000/images/kid10.webp",
    new_price: 48,
    old_price: 82,
    category: "kid",
    description: "Beautiful white frock for girls, elegant and comfy."
  },
  {
    id: 38,
    name: "Pink Frock",
    image: "http://localhost:4000/images/kid11.avif",
    new_price: 53,
    old_price: 88,
    category: "kid",
    description: "Pretty pink frock with soft fabric and cute design."
  },
  {
    id: 39,
    name: "Striped Frock",
    image: "http://localhost:4000/images/kid12.avif",
    new_price: 44,
    old_price: 75,
    category: "kid",
    description: "Frock with pastel stripes for a fun and bright look."
  },
  {
    id: 40,
    name: "Striped Full Sleeve Shirt",
    image: "http://localhost:4000/images/kid13.jpg",
    new_price: 37,
    old_price: 68,
    category: "kid",
    description: "Comfortable striped full sleeve shirt for kids."
  },
  {
    id: 41,
    name: "Red Frock",
    image: "http://localhost:4000/images/kid14.avif",
    new_price: 52,
    old_price: 85,
    category: "kid",
    description: "Bright red frock that’s great for special occasions."
  },
  {
    id: 42,
    name: "Multicolor Blue White Full Sleeve",
    image: "http://localhost:4000/images/kid15.jpg",
    new_price: 49,
    old_price: 80,
    category: "kid",
    description: "Multicolor blue and white full sleeve shirt with vibrant look."
  }
];

// 🔥 THIS IS THE IMPORTANT LINE FOR NODE:
module.exports = all_product;
