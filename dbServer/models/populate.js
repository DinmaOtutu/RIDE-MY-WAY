import seeders from '../seeders';

seeders.populate((error) => {
  if (error) throw error;
  console.log('populated');
});
