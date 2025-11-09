// src/data/courses.ts
import { Course } from '../types';

export const courses: Course[] = [
  // 6-month
  {
    id: 'firstaid',
    name: 'First Aid',
    price: 1500,
    image: require('../assets/FirstAid.png'),
    short: 'Provide first aid awareness and basic life support',
    bullets: [
      'Wounds & bleeding',
      'Burns & fractures',
      'Emergency scene management',
      'CPR (Cardio-Pulmonary Resuscitation)',
      'Respiratory distress & choking'
    ],
    duration: '6-month'
  },
  {
    id: 'sewing',
    name: 'Sewing',
    price: 1500,
    image: require('../assets/Sewing.png'),
    short: 'Alterations & new garment tailoring',
    bullets: ['Types of stitches', 'Threading a sewing machine', 'Buttons, zips, hems', 'Alterations', 'Designing garments'],
    duration: '6-month'
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    price: 1500,
    image: require('../assets/Landscaping.png'),
    short: 'Garden design and landscaping services',
    bullets: ['Indigenous & exotic plants', 'Fixed structures', 'Balancing plants & trees', 'Garden layout'],
    duration: '6-month'
  },
  {
    id: 'lifeskills',
    name: 'Life Skills',
    price: 1500,
    image: require('../assets/LifeSkills.png'),
    short: 'Banking, literacy & practical life knowledge',
    bullets: ['Opening bank account', 'Basic labour law', 'Reading & writing', 'Numeric literacy'],
    duration: '6-month'
  },

  // 6-week
  {
    id: 'childminding',
    name: 'Child Minding',
    price: 750,
    image: require('../assets/ChildMinding.png'),
    short: 'Basic child & baby care',
    bullets: ['Birth to 6 months', '7–12 months', 'Toddler care', 'Educational toys'],
    duration: '6-week'
  },
  {
    id: 'cooking',
    name: 'Cooking',
    price: 750,
    image: require('../assets/Cooking.png'),
    short: 'Prepare nutritious family meals',
    bullets: ['Nutrition basics', 'Meal planning', 'Recipes & prep', 'Cooking techniques'],
    duration: '6-week'
  },
  {
    id: 'gardenmaintenance',
    name: 'Garden Maintenance',
    price: 750,
    image: require('../assets/GardenMaintenance.png'),
    short: 'Watering, pruning & planting basics',
    bullets: ['Water restrictions', 'Pruning & propagation', 'Planting techniques'],
    duration: '6-week'
  }
];
