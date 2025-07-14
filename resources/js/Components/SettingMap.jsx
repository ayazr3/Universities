import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function DraggableMarker({ position, setPosition }) {
  const markerRef = React.useRef(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={{
        dragend: () => {
          const marker = markerRef.current;
          if (marker != null) {
            const latLng = marker.getLatLng();
            setPosition([latLng.lat, latLng.lng]);
          }
        },
      }}
      position={position}
      ref={markerRef}
    >
      <Popup>موقع الإعداد</Popup>
    </Marker>
  );
}

export default function SettingMap({ lat, lng, setLatLng, editable = false, height = 300 }) {
  const [position, setPosition] = React.useState([lat, lng]);

  React.useEffect(() => {
    if (setLatLng) {
      setLatLng({ lat: position[0], lng: position[1] });
    }
  }, [position]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: height, width: '100%', borderRadius: '8px' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {editable ? (
        <DraggableMarker position={position} setPosition={setPosition} />
      ) : (
        <Marker position={position}>
          <Popup>موقع الإعداد</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
