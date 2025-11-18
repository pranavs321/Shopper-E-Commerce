import men1 from './men1.jpg';
import men2 from './men2.webp';
import men3 from './men3.avif';
import men4 from './men4.avif';
import men5 from './men5.avif';
import men6 from './men6.avif';
import men7 from './men7.avif';
import men8 from './men8.avif';
import men9 from './men9.jpg';
import men10 from './men10.avif';
import men11 from './men11.avif';
import men12 from './men12.jpg';

import women1 from './women1.avif';
import women2 from './women2.avif';
import women3 from './women3.avif';
import women4 from './women4.avif';
import women5 from './women5.avif';
import women6 from './women6.avif';
import women7 from './women7.avif';
import women8 from './women8.avif';
import women9 from './women9.avif';
import women10 from './women10.avif';
import women11 from './women11.avif';
import women12 from './women12.avif';
import women13 from './women13.webp';
import women14 from './women14.webp';
import women15 from './women15.webp';

import kid1 from './kid1.avif';
import kid2 from './kid2.avif';
import kid3 from './kid3.jpg';
import kid4 from './kid4.avif';
import kid5 from './kid5.avif';
import kid6 from './kid6.avif';
import kid7 from './kid7.avif';
import kid8 from './kid8.avif';
import kid9 from './kid9.avif';
import kid10 from './kid10.webp';
import kid11 from './kid11.avif';
import kid12 from './kid12.avif';
import kid13 from './kid13.jpg';
import kid14 from './kid14.avif';
import kid15 from './kid15.jpg';

const all_product = [
  // MEN: 1 – 12
  {
  id: 1,
  name: "Dark Yellow Suit",
  image: men1,
  new_price: 55,
  old_price: 89,
  category: "men",
  description: "Elegant dark yellow suit with a modern tailored fit. Designed for standout occasions, featuring a notch lapel and sleek finish."
},
{
  id: 2,
  name: "Brown Full Sleeve Shirt",
  image: men2,
  new_price: 68,
  old_price: 120,
  category: "men",
  description: "Classic brown full sleeve shirt crafted from breathable fabric. Perfect for both office wear and casual styling."
},
{
  id: 3,
  name: "Pastel Yellow Suit",
  image: men3,
  new_price: 139,
  old_price: 199,
  category: "men",
  description: "Stylish pastel yellow suit with a soft, refined tone. Tailored for a modern fit, ideal for festive gatherings or summer events."
}
,
  {
    id: 4,
    name: "Pastel T-shirt",
    image: men4,
    new_price: 34,
    old_price: 60,
    category: "men",
    description: "Minimal pastel-colored t-shirt crafted from soft cotton. Breathable and lightweight, great for summer or layering."
  },
  {
    id: 5,
    name: "Yellow Jacket",
    image: men5,
    new_price: 75,
    old_price: 102,
    category: "men",
    description: "Sunny yellow zip-up jacket with side pockets. Adds color to your day and keeps you cozy on brisk evenings."
  },
  {
    id: 6,
    name: "Red Color T-shirt",
    image: men6,
    new_price: 29,
    old_price: 55,
    category: "men",
    description: "Solid red classic fit t-shirt. Simple, bold, and easy to pair with just about anything."
  },
  {
    id: 7,
    name: "Printed Half Sleeve Shirt",
    image: men7,
    new_price: 48,
    old_price: 89,
    category: "men",
    description: "Half-sleeve shirt featuring a modern all-over print. Great for smart-casual or party looks."
  },
  {
    id: 8,
    name: "Yellow T-shirt",
    image: men8,
    new_price: 33,
    old_price: 70,
    category: "men",
    description: "Chic yellow t-shirt, ultra-soft and perfect for a pop of color in your wardrobe."
  },
  {
    id: 9,
    name: "Beige Jeans",
    image: men9,
    new_price: 69,
    old_price: 129,
    category: "men",
    description: "Modern slim-fit beige jeans. Pairs well with both shirts and t-shirts, a year-round essential."
  },
  {
    id: 10,
    name: "White T-shirt",
    image: men10,
    new_price: 35,
    old_price: 62,
    category: "men",
    description: "Classic white crew-neck t-shirt. Wardrobe staple for layering or wearing solo."
  },
  {
    id: 11,
    name: "Multicolor Full Sleeve Shirt",
    image: men11,
    new_price: 56,
    old_price: 110,
    category: "men",
    description: "Vibrant multi-color full sleeve shirt, perfect for celebrations or lively weekends. Easy button up, statement style."
  },
  {
    id: 12,
    name: "Pink Suit",
    image: men12,
    new_price: 149,
    old_price: 215,
    category: "men",
    description: "Bold pink tailored suit with subtle sheen, for those who dare to stand out at every occasion."
  },

  // WOMEN: 13 – 27
  {
    id: 13,
    name: "Stylish Pink Shirt Short",
    image: women1,
    new_price: 49,
    old_price: 79,
    category: "women",
    description: "A chic pink shirt with a modern short design, perfect for casual outings or office wear."
  },
  {
    id: 14,
    name: "Stylish Yellow Shirt Short",
    image: women2,
    new_price: 42,
    old_price: 69,
    category: "women",
    description: "Bright yellow short shirt, lightweight and soft, ideal for summer days and casual looks."
  },
  {
    id: 15,
    name: "Denim Shirt with Back Print",
    image: women3,
    new_price: 59,
    old_price: 94,
    category: "women",
    description: "Classic denim shirt with trendy back print, makes a stylish statement."
  },
  {
    id: 16,
    name: "Multicolor Jacket",
    image: women4,
    new_price: 85,
    old_price: 140,
    category: "women",
    description: "Colorful jacket with vibrant patterns, designed for a fashionable and comfy fit."
  },
  {
    id: 17,
    name: "Red Jeans",
    image: women5,
    new_price: 65,
    old_price: 109,
    category: "women",
    description: "Slim fit red jeans that add a bold touch to any wardrobe."
  },
  {
    id: 18,
    name: "Fluorescent Full Sleeve Colorless T-Shirt",
    image: women6,
    new_price: 39,
    old_price: 75,
    category: "women",
    description: "Bright neon full sleeve t-shirt with a sleek transparent look."
  },
  {
    id: 19,
    name: "Off-shoulder Knitted Crop Sweater",
    image: women7,
    new_price: 55,
    old_price: 95,
    category: "women",
    description: "Soft knitted crop sweater with an off-the-shoulder design for trendy style."
  },
  {
    id: 20,
    name: "Multicolor Striped Shirt Full Sleeve",
    image: women8,
    new_price: 48,
    old_price: 87,
    category: "women",
    description: "Full sleeve shirt featuring colorful stripes, perfect for casual or workwear."
  },
  {
    id: 21,
    name: "Pink Hoodie",
    image: women9,
    new_price: 60,
    old_price: 115,
    category: "women",
    description: "Cozy pink hoodie to elevate your casual and sporty looks."
  },
  {
    id: 22,
    name: "Short Dark Blue Denim Shirt",
    image: women10,
    new_price: 65,
    old_price: 110,
    category: "women",
    description: "Dark blue denim shirt in a handy short-sleeve cut for versatile styling."
  },
  {
    id: 23,
    name: "Yellow Suit",
    image: women11,
    new_price: 180,
    old_price: 265,
    category: "women",
    description: "Elegant yellow tailored suit for smart and formal occasions."
  },
  {
    id: 24,
    name: "Dark Yellow Short Jacket",
    image: women12,
    new_price: 75,
    old_price: 120,
    category: "women",
    description: "Short, lightweight jacket in deep yellow shade, perfect for fall days."
  },
  {
    id: 25,
    name: "Green Full Sleeve Shirt",
    image: women13,
    new_price: 48,
    old_price: 85,
    category: "women",
    description: "Relaxed fit green full sleeve shirt with button closure."
  },
  {
    id: 26,
    name: "Simple White T-Shirt",
    image: women14,
    new_price: 35,
    old_price: 60,
    category: "women",
    description: "Classic white tee in soft cotton, a versatile wardrobe staple."
  },
  {
    id: 27,
    name: "Light Blue Suit",
    image: women15,
    new_price: 40,
    old_price: 70,
    category: "women",
    description: "Light blue vest with modern cut, perfect for layering in cooler months."
  },

  // KIDS: 28 – 42
  {
    id: 28,
    name: "Yellow Girl Frock",
    image: kid1,
    new_price: 42,
    old_price: 69,
    category: "kid",
    description: "Bright yellow frock for girls, made with soft cotton for comfort."
  },
  {
    id: 29,
    name: "White Girl T-shirt with Print",
    image: kid2,
    new_price: 30,
    old_price: 55,
    category: "kid",
    description: "Cute white printed t-shirt for girls, ideal for playtime."
  },
  {
    id: 30,
    name: "Boys Blue T-shirt",
    image: kid3,
    new_price: 28,
    old_price: 52,
    category: "kid",
    description: "Comfortable blue t-shirt for boys, casual and stylish."
  },
  {
    id: 31,
    name: "Boys Yellow T-shirt",
    image: kid4,
    new_price: 29,
    old_price: 54,
    category: "kid",
    description: "Bright yellow t-shirt in soft fabric, perfect for kids."
  },
  {
    id: 32,
    name: "Green Hoodie",
    image: kid5,
    new_price: 45,
    old_price: 80,
    category: "kid",
    description: "Warm green hoodie for kids, great for cool weather."
  },
  {
    id: 33,
    name: "Denim Shirt",
    image: kid6,
    new_price: 38,
    old_price: 67,
    category: "kid",
    description: "Stylish denim shirt for kids that pairs well with jeans."
  },
  {
    id: 34,
    name: "Girls T-shirt with Net at Bottom",
    image: kid7,
    new_price: 40,
    old_price: 75,
    category: "kid",
    description: "Adorable girls t-shirt with mesh net detail for flair."
  },
  {
    id: 35,
    name: "Cheque Shirt Boys",
    image: kid8,
    new_price: 35,
    old_price: 65,
    category: "kid",
    description: "Classic checkered shirt for boys with a relaxed fit."
  },
  {
    id: 36,
    name: "Denim Pinafore Dress",
    image: kid9,
    new_price: 50,
    old_price: 90,
    category: "kid",
    description: "Stylish denim pinafore dress for girls, perfect for casual wear."
  },
  {
    id: 37,
    name: "White Frock",
    image: kid10,
    new_price: 48,
    old_price: 82,
    category: "kid",
    description: "Beautiful white frock for girls, elegant and comfy."
  },
  {
    id: 38,
    name: "Pink Frock",
    image: kid11,
    new_price: 53,
    old_price: 88,
    category: "kid",
    description: "Pretty pink frock with soft fabric and cute design."
  },
  {
    id: 39,
    name: "Striped Frock",
    image: kid12,
    new_price: 44,
    old_price: 75,
    category: "kid",
    description: "Frock with pastel stripes for a fun and bright look."
  },
  {
    id: 40,
    name: "Striped Full Sleeve Shirt",
    image: kid13,
    new_price: 37,
    old_price: 68,
    category: "kid",
    description: "Comfortable striped full sleeve shirt for kids."
  },
  {
    id: 41,
    name: "Red Frock",
    image: kid14,
    new_price: 52,
    old_price: 85,
    category: "kid",
    description: "Bright red frock that’s great for special occasions."
  },
  {
    id: 42,
    name: "Multicolor Blue White Full Sleeve",
    image: kid15,
    new_price: 49,
    old_price: 80,
    category: "kid",
    description: "Multicolor blue and white full sleeve shirt with vibrant look."
  }
];

export default all_product;
