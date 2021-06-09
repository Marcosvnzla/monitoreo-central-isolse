import { React, Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import * as actions from '../../store/actions/index';
import styles from './Location.module.css';

class Location extends Component {

  state = {
    locationAddresses: []
  }

  componentDidMount () {
    this.props.onGetLocations(this.props.userId, this.props.token);
    if (this.props.locations.length !== 0) {
      console.log(this.props.locations.length);
      this.renderMap();
    }
  }

  renderMap = () => {
    let map;
    const loader = new Loader({
      apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
      version: "weekly"
    });

    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.603684, lng: -58.381559},
        zoom: 8
      });
    });

    for (let i of this.props.locations) {
      const uriAddress = encodeURIComponent(i);
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${uriAddress}&key=${process.env.REACT_APP_MAPS_API_KEY}`)
      .then(response => {
        console.log(response.data.results[0].geometry.location);
        const coordinates = response.data.results[0].geometry.location;
          new google.maps.Marker({
            position: coordinates,
            map: map,
            title: "Daniel es bien marico"
          });
      })
      .catch(error => {
        console.log(error.response.data)
      });
    }
  }

  render () {
    if (this.props.locations.length !== 0) {
      this.renderMap();
    }

    return (
      this.props.locations.length !== 0 ? <div className={styles.Location} id="map"></div> : "Cargando"
    );
  }
}
  
const mapStateToProps = state => {
  return {
    userId: state.userId,
    token: state.token,
    locations: state.locations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetLocations: (uid, token) => dispatch(actions.getLocations(uid, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);