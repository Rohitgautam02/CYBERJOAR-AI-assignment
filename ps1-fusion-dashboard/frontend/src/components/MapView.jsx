import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NODE_COLORS } from '../utils/nodeColors';

/**
 * CyberJoar Strategic Fusion Dashboard
 * Component: MapView
 */

// Fix Leaflet default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ nodes, onHover, onNodeClick }) => {
  const center = [22.5, 82.0]; // Centered on India
  
  return (
    <div className="w-full h-full relative bg-bg-primary overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={5} 
        className="w-full h-full"
        zoomControl={false}
        minZoom={3}
        maxZoom={16}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <ZoomControl position="bottomright" />

        {nodes.map((node) => {
          const colors = NODE_COLORS[node.type] || NODE_COLORS.OSINT;
          const isHighPriority = node.priority === 'HIGH';

          return (
            <React.Fragment key={node.id}>
              {/* Pulsing ring for IMINT or High Priority */}
              {(node.type === 'IMINT' || isHighPriority) && (
                <CircleMarker
                  center={[node.lat, node.lng]}
                  radius={isHighPriority ? 12 : 15}
                  pathOptions={{
                    fillColor: isHighPriority ? '#ef4444' : colors.fill,
                    color: 'transparent',
                    fillOpacity: 0.15
                  }}
                  className="animate-node-pulse"
                />
              )}

              {/* Main Node Marker */}
              <CircleMarker
                center={[node.lat, node.lng]}
                radius={9}
                pathOptions={{
                  fillColor: colors.fill,
                  color: isHighPriority ? '#ef4444' : colors.border,
                  fillOpacity: 0.9,
                  weight: isHighPriority ? 2.5 : 1.5,
                }}
                eventHandlers={{
                  mouseover: () => onHover(node),
                  mouseout: () => onHover(null),
                  click: () => onNodeClick(node)
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div className="font-mono text-[10px] tracking-tight">
                    {node.label}
                  </div>
                </Tooltip>
              </CircleMarker>

              {/* Extra priority indicator dot */}
              {isHighPriority && (
                <CircleMarker
                  center={[node.lat, node.lng]}
                  radius={3}
                  pathOptions={{
                    fillColor: '#fff',
                    color: 'transparent',
                    fillOpacity: 1
                  }}
                  interactive={false}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Map Scanning Indicator Effect */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-accent-teal/10 shadow-[0_0_15px_var(--accent-teal)] animate-scan z-[500] pointer-events-none opacity-20" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }


        /* Fix for tile grid lines/gaps */
        .leaflet-tile-container img {
          outline: 1px solid transparent;
          -webkit-backface-visibility: hidden;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
          pointer-events: none;
        }
      `}} />
    </div>
  );
};

export default MapView;

