import React from 'react';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';
import Apartment from '../components/Apartment'
import AddOrEditApartment from '../components/AddOrEditApartment';

@observer class App extends React.Component {
  componentDidMount() {
    this.props.store.getRepairTypes();
    this.props.store.getFreeApartments();
    this.props.store.getRentedApartments();
  }

  rentOut = id => this.props.store.rentOutApartment(id);
  free = id => this.props.store.freeRentedApartment(id); 

  renderList = (apartments, changeButtonClick) => (
    <ListGroup>
      {apartments.map((el, id) => (
        <ListGroup.Item key={id}> 
          <Apartment
            data={el}
            handleChangeButtonClick={changeButtonClick}
            store={this.props.store}
            ></Apartment>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  render() {
    const { freeApartments, rentedAppartments } = this.props.store;

    return (
      <Container>
        <Row>
          <AddOrEditApartment store={this.props.store} />
        </Row>
        <br></br>
        <Row>
          <Col>
            {this.renderList(freeApartments, this.rentOut)}
          </Col>
          <Col>
            {this.renderList(rentedAppartments, this.free)}
          </Col>
        </Row>
      </Container>
    )
  }
}


export default App;
