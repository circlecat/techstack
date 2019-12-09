import { observable, configure, action, decorate } from 'mobx';
import axios from 'axios';
configure({ enforceActions: 'observed' });

class ApartmentStore {
  freeApartments = [];
  rentedAppartments = [];
  repairTypes = [];

  getFreeApartments() {
    return axios.get('http://localhost:3088/apartment/free')
      .then(res => res.data)
      .then(this.setFreeApartments)
  }

  setFreeApartments(apartments) {
    this.freeApartments = apartments;
  }

  getRentedApartments() {
    return axios.get('http://localhost:3088/apartment/rented')
      .then(res => res.data)
      .then(this.setRentedApartments)
  }

  setRentedApartments(apartments) {
    this.rentedAppartments = apartments;
  }

  getRepairTypes() {
    return axios.get('http://localhost:3088/apartment/get-repair-type') //edit
      .then(res => res.data)
      .then(this.setRepairTypes)
  }

  setRepairTypes(repairTypes) {
    this.repairTypes = repairTypes;
  }

  addApartment(apartment) {
    return axios.post('http://localhost:3088/apartment/', apartment)
      .then(() => {
        this.getRentedApartments();
        this.getFreeApartments()
      })
      .catch(err => err.response.data)
  }

  rentOutApartment(id) {
    return axios.get(`http://localhost:3088/apartment/rent-out/${id}`)
      .then(() => {
        this.getRentedApartments();
        this.getFreeApartments()
      })
  }

  freeRentedApartment(id) {
    return axios.get(`http://localhost:3088/apartment/stop-rent-out/${id}`)
      .then(() => {
        this.getRentedApartments();
        this.getFreeApartments()
      })
  }

  removeApartment(id) {
    return axios.delete(`http://localhost:3088/apartment/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.getRentedApartments();
        this.getFreeApartments()
      })
  }

  editApartment(apartment) {
    return axios.put(`http://localhost:3088/apartment/`, apartment)
      .then(res => {
        this.getRentedApartments();
        this.getFreeApartments()
      })
      .catch(err => err.response.data)
  }
}

decorate(ApartmentStore, {
  freeApartments: observable,
  rentedAppartments: observable,
  getFreeApartments: action,
  setFreeApartments: action.bound,
  getRentedApartments: action,
  setRentedApartments: action.bound,
  addApartment: action,
  rentOutApartment: action,
  freeRentedApartment: action,
  removeApartment: action,
  editApartment: action,
  getRepairTypes: action,
  setRepairTypes: action.bound
})

export default ApartmentStore;