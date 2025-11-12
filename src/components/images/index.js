// Image imports
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import image4 from './image4.jpeg';
import image5 from './image5.jpeg';
import image6 from './image6.jpeg';
import image7 from './image7.jpeg';
import image8 from './image8.jpeg';
import image9 from './image9.jpeg';
import image10 from './image10.jpeg';
import image11 from './image11.jpeg';
import image12 from './image12.jpeg';
import image13 from './image13.jpeg';
import image14 from './image14.jpeg';
import image15 from './image15.jpeg';
import image16 from './image16.jpeg';
import image17 from './image17.jpeg';
import image18 from './image18.jpeg';
import image19 from './image19.jpeg';
import image20 from './image20.jpeg';
import image21 from './image21.jpeg';
import image22 from './image22.jpeg';
import image23 from './image23.jpeg';
import image24 from './image24.jpeg';
import image25 from './image25.jpeg';
import image26 from './image26.jpeg';
import image27 from './image27.jpeg';
import image28 from './image28.jpeg';
import image29 from './image29.jpeg';
import image30 from './image30.jpeg';
import image31 from './image31.jpeg';
import image32 from './image32.jpeg';
import image33 from './image33.jpeg';
import image34 from './image34.jpeg';
import image35 from './image35.jpeg';

// Products dataset (35 products)
export const products = [
  { id: 1, name: "Organic Tomatoes", image: image1, price: 15.99, description: "Fresh, organic tomatoes grown locally.", category: "Vegetables", type: "Organic", bestseller: true },
  { id: 2, name: "Red Apples", image: image2, price: 41.50, description: "Crisp and juicy red apples.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 3, name: "Organic Spinach", image: image3, price: 35.99, description: "Fresh, pesticide-free spinach.", category: "Vegetables", type: "Organic", bestseller: true },
  { id: 4, name: "Maize Seeds", image: image4, price: 500.50, description: "High-yield maize seeds for your farm.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 5, name: "Wheat Seeds", image: image5, price: 450.50, description: "High-quality wheat seeds for your farm.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 6, name: "Carrots", image: image6, price: 52.25, description: "Sweet and crunchy carrots.", category: "Vegetables", type: "Conventional", bestseller: true },
  { id: 7, name: "Bananas", image: image7, price: 39.75, description: "Fresh yellow bananas rich in potassium.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 8, name: "Organic Lettuce", image: image8, price: 65.50, description: "Crisp, organic lettuce for salads.", category: "Vegetables", type: "Organic", bestseller: false },
  { id: 9, name: "Soybeans", image: image9, price: 190.00, description: "High-protein soybeans for cooking or planting.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 10, name: "Organic Fertilizer", image: image10, price: 2000.00, description: "Eco-friendly fertilizer for organic crops.", category: "Fertilizers", type: "Organic", bestseller: false },
  { id: 11, name: "Potatoes", image: image11, price: 400.50, description: "Fresh and versatile potatoes.", category: "Vegetables", type: "Conventional", bestseller: true },
  { id: 12, name: "Strawberries", image: image12, price: 70.99, description: "Sweet and juicy strawberries.", category: "Fruits", type: "Organic", bestseller: true },
  { id: 13, name: "Corn Seeds", image: image13, price: 640.50, description: "Premium corn seeds for high yield.", category: "Seeds", type: "Conventional", bestseller: false },
  { id: 14, name: "Organic Kale", image: image14, price: 34.75, description: "Leafy and nutritious kale.", category: "Vegetables", type: "Organic", bestseller: false },
  { id: 15, name: "Green Apples", image: image15, price: 44.25, description: "Crisp green apples.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 16, name: "Barley", image: image16, price: 880.00, description: "Quality barley grains.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 17, name: "Organic Cabbage", image: image17, price: 54.25, description: "Fresh organic cabbage.", category: "Vegetables", type: "Organic", bestseller: false },
  { id: 18, name: "Oranges", image: image18, price: 35.50, description: "Juicy and sweet oranges.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 19, name: "Rice Seeds", image: image19, price: 190.50, description: "High-quality rice seeds.", category: "Seeds", type: "Conventional", bestseller: false },
  { id: 20, name: "Tomato Seeds", image: image20, price: 800.00, description: "Seeds for growing organic tomatoes.", category: "Seeds", type: "Organic", bestseller: false },
  { id: 21, name: "Cucumber", image: image21, price: 54.50, description: "Fresh crunchy cucumbers.", category: "Vegetables", type: "Conventional", bestseller: true },
  { id: 22, name: "Pineapple", image: image22, price: 110.50, description: "Sweet tropical pineapples.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 23, name: "Organic Broccoli", image: image23, price: 85.25, description: "Fresh organic broccoli.", category: "Vegetables", type: "Organic", bestseller: false },
  { id: 24, name: "Millet", image: image24, price: 400.50, description: "Nutritious millet grains.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 25, name: "Spinach Seeds", image: image25, price: 130.50, description: "High-quality spinach seeds.", category: "Seeds", type: "Conventional", bestseller: false },
  { id: 26, name: "Organic Carrots", image: image26, price: 95.75, description: "Organic fresh carrots.", category: "Vegetables", type: "Organic", bestseller: true },
  { id: 27, name: "Mangoes", image: image27, price: 60.99, description: "Sweet ripe mangoes.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 28, name: "Organic Wheat", image: image28, price: 1000.50, description: "Organic wheat grains.", category: "Grains", type: "Organic", bestseller: false },
  { id: 29, name: "Fertilizer Pack", image: image29, price: 2500.00, description: "General purpose fertilizer.", category: "Fertilizers", type: "Conventional", bestseller: false },
  { id: 30, name: "Red Cabbage", image: image30, price: 180.99, description: "Fresh red cabbage.", category: "Vegetables", type: "Conventional", bestseller: false },
  { id: 31, name: "Organic Bell Pepper", image: image31, price: 52.50, description: "Fresh organic bell peppers.", category: "Vegetables", type: "Organic", bestseller: true },
  { id: 32, name: "Grapes", image: image32, price: 120.75, description: "Sweet seedless grapes.", category: "Fruits", type: "Conventional", bestseller: true },
  { id: 33, name: "Organic Corn", image: image33, price: 65.50, description: "Fresh organic corn cobs.", category: "Vegetables", type: "Organic", bestseller: false },
  { id: 34, name: "Oats", image: image34, price: 240.25, description: "High-quality oats grains.", category: "Grains", type: "Conventional", bestseller: false },
  { id: 35, name: "Chili Seeds", image: image35, price: 300.00, description: "Premium chili seeds.", category: "Seeds", type: "Conventional", bestseller: false },
];
