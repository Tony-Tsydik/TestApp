import React from 'react';
import { Map, GoogleApiWrapper, Polygon, Polyline } from 'google-maps-react';
import coordinates from '../floor';
import config from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import {mapStyles, containerStyles, colors} from './stylesAttributes/buildingPlanStylesAttributes';

const MapContainer = (props) => {

    const initialCoordinates = {
        polygonCoordinates: [],
        otherCoordinates: []
    };

    const featureGeometryType = 'Polygon';

    coordinates.features.forEach((item) => {
        if (item.geometry.type === featureGeometryType) {
            const currentPolygonArray = [];
            item.geometry.coordinates.forEach((item) => {
                currentPolygonArray.push({lat: item[1], lng: item[0] })
            });
            initialCoordinates.polygonCoordinates.push(currentPolygonArray)
        } else {
            const currentCoordinatesArray = [];
            item.geometry.coordinates.forEach((item) => {
                currentCoordinatesArray.push({lat: item[1], lng: item[0] })
            });
            initialCoordinates.otherCoordinates.push(currentCoordinatesArray)
        }
    })
    return (
        <Map
            google = {props.google}
            zoom = {20}
            style = {mapStyles}
            containerStyle = {containerStyles}
            initialCenter = {
                {
                    lat: 53.9171,
                    lng: 27.63485762632
                }
            }>
            {initialCoordinates.polygonCoordinates.map(item => <Polygon
                paths = {item}
                strokeColor = {colors.polygonStrokeColor}
                strokeOpacity = {1}
                strokeWeight = {2}
                fillColor = {colors.polygonFillColor}
                fillOpacity = {1}
                key = {uuidv4()} />)}
            {initialCoordinates.otherCoordinates.map(item => <Polyline
                path = {item}
                strokeColor = {colors.polylineStrokeColor}
                strokeOpacity = {1}
                strokeWeight = {2}
                key = {uuidv4()} />)}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: config.googleMapConfig.apiKey
})(MapContainer);