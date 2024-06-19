class Car extends Component {
  static list = [];

  static init(cars) {
    this.list = cars.map(car => new this(car));
  }

  constructor(props) {
    super(props);
    this.id = props.id;
    this.plate = props.plate;
    this.manufacture = props.manufacture;
    this.available = props.available;
    this.model = props.model;
    this.image = props.image;
    this.rentPerDay = props.rentPerDay;
    this.capacity = props.capacity;
    this.description = props.description;
    this.transmission = props.transmission;
    this.type = props.type;
    this.year = props.year;
    this.options = props.options;
    this.specs = props.specs;
    this.availableAt = props.availableAt;
  }

  render() {
    return `
        <div class="col-sm-4">
            <div class="card mx-auto my-4 g-0 car-card" style="width: 25rem; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);">
                <img src="${this.image}" class="card-img-top img-fluid" alt="${this.manufacture}" style="height: 195px; border-radius: 3px; object-fit: cover;" />
                <div class="card-body" style="font-size: 14px">
                    <p class="card-title">${this.manufacture} ${this.model}</p>
                    <p class="fw-bold">Rp${this.rentPerDay} / hari</p>
                    <p class="card-text" style="height: 90px">${this.description}</p>
                    <div class="my-2"><i class="bi bi-people me-2"></i>${this.capacity} Orang</div>
                    <div class="my-2"><i class="bi bi-gear me-2"></i>${this.transmission}</div>
                    <div class="my-2"><i class="bi bi-calendar4 me-2"></i>${moment(this.availableAt).format('YYYY-MM-DD HH:mm')}</div>
                    <a href="#" class="btn btn-success text-white w-100 mt-2 fw-bold mt-4 " style="font-size: 14px">Pilih Mobil</a>
                </div>
            </div>
        </div>
    `;
  }
}

async function fetchData() {
  const response = await fetch("http://localhost:8000/data_cars");
  const data = await response.json();
  Car.init(data);
}

fetchData();

document.getElementById('btn-search').onclick = function () {

  let child = document.getElementById('cars-list').firstElementChild;
  while (child) {
    document.getElementById('cars-list').removeChild(child);
    child = document.getElementById('cars-list').firstElementChild;
  }
  let driver = document.getElementById("driver").value;
  let date = new Date(`${document.getElementById("date").value} ${document.getElementById("time").value}`);
  console.log(date);

  if (!driver || date == 'Invalid Date') {
    alert("Please select driver type and date");
    return;
  }
  let passenger = document.getElementById("passenger").value;

  let filteredCars = Car.list.filter(car => {
    return car.capacity >= passenger && moment(car.availableAt).format('YYYY-MM-DD HH:mm') >= moment(date).format('YYYY-MM-DD HH:mm') && String(car.available) === driver;
  });

  let sortedCars = filteredCars.sort((a, b) => a.capacity - b.capacity);

  if (sortedCars.length > 0) {
    let cars = sortedCars.map(car => car.render()).join('');
    document.getElementById('cars-list').innerHTML = cars;
  } else {
    const node = document.createElement("div");
    node.innerHTML = `<div class="alert alert-danger mt-2 text-center" role="alert">Data Tidak Ditemukan
  </div>`;
    document.getElementById('cars-list').appendChild(node);
  }
}