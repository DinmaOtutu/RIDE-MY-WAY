import seeders from '../seeders';

seeders.drop((error) => {
    if (error) throw error;
  console.log('dropped');
});
