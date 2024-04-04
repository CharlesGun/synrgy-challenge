function sortCarByYearAscendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  let terminal = {
    name: "Sort Car By Year Ascendingly"
  };
  const result = [...cars];
  terminal.unsorted = result;

  let final = [...result]

  // sort function
  // let final = result.sort((a, b) => a.year - b.year);

  // Tulis code-mu disini
  for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < final.length - 1; j++) {
      if (final[j].year > final[j + 1].year) {
        let temp = final[j]
        final[j] = final[j + 1]
        final[j + 1] = temp
      }
    }
  }

  terminal.sorted = final;
  console.log(terminal);

  // Rubah code ini dengan array hasil sorting secara ascending
  return final;
}