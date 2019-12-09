import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddOrEditApartment from './AddOrEditApartment';

const Apartment = props => {
  const { handleChangeButtonClick } = props;

  const { id, area, rooms, price, yearOfConstruction, repairType, address, isRented, rentStartDate, rentEndDate } = props.data;

  const [isBeingEdited, setBeingEdited] = useState(false);

  const removeApartment = id => props.store.removeApartment(id);

  return (
    <Container>
      {isBeingEdited ? <AddOrEditApartment data={props.data} isBeingEdited store={props.store} setBeingEdited={() => setBeingEdited(false)} /> : 
      <Row>
        <Col>
          Apartment:
          <ul style={{ listStyleType: 'none' }}>
            <li>Area: {area} м²</li>
            <li>Rooms: {rooms}</li>
            <li>Price: {price}</li>
            <li>Year of construction: {yearOfConstruction}</li>
            <li>Repair Type: {repairType}</li>
            <li>{!isRented || `Rent start date: ${rentStartDate}`}</li>
            <li>{!isRented || `Rent end date: ${rentEndDate}`}</li>
          </ul>
        </Col>
        <Col>
          Address:
          <ul style={{ listStyleType: 'none' }}>
            <li>City: {address.city} м²</li>
            <li>Street: {address.street}</li>
            <li>House: {address.houseNumber}</li>
            <li>Room: {address.roomNumber}</li>
          </ul>
        </Col>
        <Col>
          <Button onClick={() => handleChangeButtonClick(id)} >{isRented ? "Cancel" : 'Rent Out'}</Button>
          <Button style={{ backgroundColor: 'green' }} onClick={() => setBeingEdited(true)} >Edit</Button>
          <Button style={{ backgroundColor: 'red' }} onClick={() => removeApartment(id)} >Delete</Button>
        </Col>
      </Row>}
      
    </Container>
  )
}

export default Apartment;
