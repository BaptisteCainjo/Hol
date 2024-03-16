import { Icon } from "leaflet";
import MapPinIcon from "../../assets/svg/icons/map-pin-icon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const LeafletMap = ({ style, address }) => {
    const [location, setLocation] = useState(null);

    const customIcon = new Icon({
        iconUrl: MapPinIcon,
        iconSize: [40, 40]
    });

    useEffect(() => {
        async function getLocation() {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?street=${address?.street}&city=${address?.city}&country=${address?.country}&postalcode=${address?.postalCode}&format=jsonv2`);
                setLocation(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        }
        getLocation();
    }, [address]);

    return (
        location ? (
            <MapContainer style={style} center={[location.lat, location.lon]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.lat, location.lon]} icon={customIcon}>
                    <Popup>
                        <b>Voici la boutique de l'artisan</b>
                    </Popup>
                </Marker>
            </MapContainer>
        ) : (
            <Skeleton style={style} />
        )
    );
}

export default LeafletMap;