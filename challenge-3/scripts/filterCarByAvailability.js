function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  let terminal = {name: "Filter Car By Availability"};
  terminal.unfiltered = cars;

  // Tempat penampungan hasil
  const result = [];

  // Tulis code-mu disini
  // option1
  for(let i = 0; i < cars.length; i++) {
    cars[i].available ? result.push(cars[i]) : null;
  }

  // option2
  // cars.forEach(item => {
  //   item.available ? result.push(item) : null;
  // });

  // option3
  // result = cars.filter(item => item.available);

  terminal.filtered = result;

  console.log(terminal);
  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
