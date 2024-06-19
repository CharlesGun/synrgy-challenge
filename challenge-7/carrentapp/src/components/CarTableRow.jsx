function CarTableRow({car, index}) {
  return (
    <tr>
        <td>
            {index + 1}
        </td>
        <td>
            {car.manufacture}
        </td>
        <td>
            { car.model }
        </td>
        <td>
            { car.rentPerDay }
        </td>
        <td>
            { car.capacity }
        </td>
        <td>
            { car.year }
        </td>
        <td>
            { car.availableAt }
        </td>
        <td>
            { String(car.available) }
        </td>
    </tr>
  )
}

export default CarTableRow