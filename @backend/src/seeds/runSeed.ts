import { runSeeders } from './index.js';

console.log('🚀 Starting direct seeder...');

runSeeders()
  .then(() => {
    console.log('🏁 Seeding completed. Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }); 