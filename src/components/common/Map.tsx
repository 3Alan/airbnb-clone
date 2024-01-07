import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { ListingItem } from '../../interface/Listing';

interface MapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  listing: ListingItem[];
}

const Map: FC<MapProps> = ({ initialRegion, listing }) => {
  const handleMarkerPress = () => {};

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
      initialRegion={initialRegion}
    >
      {listing.map(item => (
        <Marker
          key={item.id}
          coordinate={{
            latitude: item.geolocation.lat,
            longitude: item.geolocation.lon
          }}
          onPress={() => {}}
        >
          <View style={styles.marker}>
            <Text style={styles.unit}>￥</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        </Marker>
      ))}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  unit: {
    fontSize: 10,
    fontWeight: '600'
  },
  price: {
    fontSize: 13,
    fontWeight: '600'
  },
  marker: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 20
    }
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
