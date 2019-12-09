import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from "yup";

const validationSchema = yup.object({
  area: yup.number().required().min(1).max(10000),
  rooms: yup.number().required().min(1).max(100),
  price: yup.number().required().min(1).max(999999999),
  yearOfConstruction: yup.number().required().min(1901).max(new Date().getFullYear()),
  repairType: yup.string().required(),
  city: yup.string().required().min(1).max(55),
  street: yup.string().required().min(1).max(255),
  houseNumber: yup.number().required().min(1).max(1000),
  roomNumber: yup.number().required().min(1).max(1000),
})

const AddOrEditApartment = props => {
  const [addressError, setAddressError] = useState(false);

  const { isBeingEdited, setBeingEdited, data } = props;
  const { repairTypes } = props.store;

  let initialValues = {
    area: 0,
    rooms: 0,
    price: 0,
    yearOfConstruction: 1901,
    repairType: repairTypes[0],
    city: '',
    street: '',
    houseNumber: 0,
    roomNumber: 0,
  }

  if (isBeingEdited && data) {
    initialValues = {
      area: data.area,
      rooms: data.rooms,
      price: data.price,
      yearOfConstruction: data.yearOfConstruction,
      repairType: repairTypes[0],
      city: data.address.city,
      street: data.address.street,
      houseNumber: data.address.houseNumber,
      roomNumber: data.address.roomNumber,
    }
  }
  
  return (
    <Formik 
      onSubmit={value => {
        const { area, rooms, price, yearOfConstruction, city, street, houseNumber, roomNumber, repairType } = value;

        const apartment = {
          id: props.data ? props.data.id : undefined,
          area,
          rooms,
          price,
          yearOfConstruction,
          repairType,
          address: {
            id: props.data ? props.data.address.id : undefined,
            city,
            street,
            houseNumber,
            roomNumber
          }
        }

        if (isBeingEdited) {
          props.store.editApartment(apartment).then(res => {
            if (res === 'ADDRESS_ALREADY_EXIST') {
              setAddressError(true); 
            } else {
              setBeingEdited();
            }
          });
          
        } else {
          props.store.addApartment(apartment).then(res => {
            if (res === 'ADDRESS_ALREADY_EXIST')
            setAddressError(true);
          });
        }
      }}
      validateOnChange={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange, handleSubmit, handleBlur, isValid, touched, isInvalid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h3>{isBeingEdited ? 'Edit apartment' : 'New Apartment'}</h3>
          <Form.Row>
            <Form.Group>
              <Form.Label>Area:</Form.Label>
              <Form.Control
                type='number'
                name='area'
                placeholder='area'
                value={values.area}
                onChange={handleChange}
                isValid={touched.area && !errors.area}
                isInvalid={!!errors.area}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.area}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Rooms:</Form.Label>
              <Form.Control
                type='number'
                name='rooms'
                placeholder='rooms'
                value={values.rooms}
                onChange={handleChange}
                isValid={touched.rooms && !errors.rooms}
                isInvalid={!!errors.rooms}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.rooms}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                name='price'
                placeholder='price'
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid={!!errors.price}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Year Of Construction:</Form.Label>
              <Form.Control
                type='number'
                name='yearOfConstruction'
                placeholder='Year Of Construction'
                value={values.yearOfConstruction}
                onChange={handleChange}
                isValid={touched.yearOfConstruction && !errors.yearOfConstruction}
                isInvalid={!!errors.yearOfConstruction}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.yearOfConstruction}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Repair type:</Form.Label>
              <select
                name="repairType"
                value={values.repairType}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display: 'block' }}
              >
                <option value='' label='Select repair type'></option>
                <option value={repairTypes[0]} label={repairTypes[0]}></option>
                <option value={repairTypes[1]} label={repairTypes[1]}></option>
                <option value={repairTypes[2]} label={repairTypes[2]}></option>
              </select>
              {errors.repairType &&
                touched.repairType &&
                <div style={{color: 'red'}}>
                  {errors.repairType}
                </div>}
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>City:</Form.Label>
              <Form.Control
                name='city'
                type='text'
                placeholder='city'
                value={values.city}
                onChange={handleChange}
                isValid={touched.city && !errors.city}
                isInvalid={!!errors.city}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Street:</Form.Label>
              <Form.Control
                type='text'
                name='street'
                placeholder='street'
                value={values.street}
                onChange={handleChange}
                isValid={touched.street && !errors.street}
                isInvalid={!!errors.street}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.street}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>House Number:</Form.Label>
              <Form.Control
                type='number'
                name='houseNumber'
                placeholder='House Number'
                value={values.houseNumber}
                onChange={handleChange}
                isValid={touched.houseNumber && !errors.houseNumber}
                isInvalid={!!errors.houseNumber}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.houseNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Room number:</Form.Label>
              <Form.Control
                type='number'
                name='roomNumber'
                placeholder='Room Number'
                value={values.roomNumber}
                onChange={handleChange}
                isValid={touched.roomNumber && !errors.roomNumber}
                isInvalid={!!errors.roomNumber}
              >
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.roomNumber}
              </Form.Control.Feedback>
            </Form.Group> 
          </Form.Row>
          {addressError && <div style={{color: 'red'}}>Address already exist.</div>}
          <Button type="submit">{isBeingEdited ? 'Save' : 'Add'}</Button>
        </Form>
      )}
    </Formik>
  )
}

export default AddOrEditApartment;