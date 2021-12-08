
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import NetworkingData from './NetworkingData';

const trafficShares = [
    { id: 1, label: "Desktop", value: 60, color: "secondary", icon: faDesktop },
    { id: 2, label: "Mobile Web", value: 30, color: "primary", icon: faMobileAlt },
];

const totalOrders = [
    { id: 1, label: "July", value: [1, 5, 2, 5, 4, 3], color: "primary" },
    { id: 2, label: "August", value: [2, 3, 4, 8, 1, 2], color: "secondary" }
];

const influenceDistrib = NetworkingData.slice(0, 15).map(el => {
    return {
        id: el.id,
        label: el.data.label,
        value: el.data.influenceDistrib*100,
        icon: faMobileAlt
    }
})

export {
    trafficShares,
    totalOrders,
    influenceDistrib,
};