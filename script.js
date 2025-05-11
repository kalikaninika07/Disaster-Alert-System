// Types
const DisasterType = {
    EARTHQUAKE: 'EARTHQUAKE',
    FLOOD: 'FLOOD',
    FIRE: 'FIRE',
    CYCLONE: 'CYCLONE'
  };
  
  // Mock data
  const mockAlerts = [
    {
      id: '1',
      type: DisasterType.EARTHQUAKE,
      severity: 4,
      location: {
        lat: 34.0522,
        lng: -118.2437,
        name: 'Los Angeles, CA'
      },
      description: 'Magnitude 6.2 earthquake detected. Aftershocks expected.',
      timestamp: new Date().toISOString(),
      safetyTips: [
        'Stay away from buildings and power lines',
        'Move to open areas if safe to do so',
        'Be prepared for aftershocks'
      ],
      safeZones: [
        {
          name: 'Central Park Emergency Shelter',
          distance: '0.8',
          address: '123 Park Avenue, Los Angeles',
          capacity: 'High',
          type: 'Emergency Shelter'
        },
        {
          name: 'City Hall Safe Zone',
          distance: '1.2',
          address: '456 Main Street, Los Angeles',
          capacity: 'Medium',
          type: 'Government Building'
        }
      ]
    },
    {
      id: '2',
      type: DisasterType.FLOOD,
      severity: 3,
      location: {
        lat: 34.0522,
        lng: -118.2437,
        name: 'Sacramento, CA'
      },
      description: 'Flash flood warning in effect. River levels rising rapidly.',
      timestamp: new Date().toISOString(),
      safetyTips: [
        'Move to higher ground immediately',
        'Avoid walking or driving through flood waters',
        'Follow evacuation orders if given'
      ],
      safeZones: [
        {
          name: 'Highland Community Center',
          distance: '0.5',
          address: '789 Highland Ave, Sacramento',
          capacity: 'High',
          type: 'Emergency Shelter'
        },
        {
          name: 'Memorial High School',
          distance: '1.5',
          address: '321 School Road, Sacramento',
          capacity: 'High',
          type: 'School Building'
        }
      ]
    }
  ];
  
  // Helper functions
  function getAlertIcon(type) {
    switch (type) {
      case DisasterType.EARTHQUAKE:
        return '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>';
      case DisasterType.FIRE:
        return '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c.46 2.95-.46 4.34-2.95 5.3C6.36 8.5 4 10.47 4 14.1c0 3.32 2.45 5.9 8 5.9s8-2.58 8-5.9c0-3.63-2.36-5.6-5.05-6.8C12.46 6.34 11.54 4.95 12 2Z"></path><path d="M12 16a2 2 0 0 0 2-2c0-.99-2-2.5-2-2.5S10 13 10 14a2 2 0 0 0 2 2Z"></path></svg>';
      case DisasterType.FLOOD:
        return '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10"></path><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M12 9v3l2 2"></path></svg>';
      case DisasterType.CYCLONE:
        return '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path><path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path><path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path></svg>';
    }
  }
  
  function createSafeZonesList(safeZones) {
    return safeZones.map(zone => `
      <div class="safe-zone-item">
        <div class="safe-zone-header">
          <svg xmlns="http://www.w3.org/2000/svg" class="safe-zone-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path><path d="M12 9h.01"></path><path d="M11 12h1v4h1"></path></svg>
          <h4>${zone.name}</h4>
          <span class="distance">${zone.distance} miles</span>
        </div>
        <div class="safe-zone-details">
          <p><strong>Address:</strong> ${zone.address}</p>
          <p><strong>Type:</strong> ${zone.type}</p>
          <p><strong>Capacity:</strong> ${zone.capacity}</p>
        </div>
        <button class="directions-btn" onclick="getDirections('${zone.address}')">Get Directions</button>
      </div>
    `).join('');
  }
  
  function createAlertCard(alert) {
    return `
      <div class="alert-card">
        <div class="alert-header">
          <div class="alert-type">
            ${getAlertIcon(alert.type)}
            <h3>${alert.type}</h3>
          </div>
          <span class="alert-severity severity-${alert.severity}">
            Level ${alert.severity}
          </span>
        </div>
        
        <div class="alert-content">
          <p class="alert-description">${alert.description}</p>
          <p class="alert-meta">
            Location: ${alert.location.name}<br>
            Time: ${new Date(alert.timestamp).toLocaleString()}
          </p>
        </div>
  
        <div class="alert-tips">
          <h4 class="tips-title">Safety Tips:</h4>
          <ul class="tips-list">
            ${alert.safetyTips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
  
        <div class="safe-zones">
          <h4 class="safe-zones-title">Nearest Safe Zones:</h4>
          <div class="safe-zones-list">
            ${createSafeZonesList(alert.safeZones)}
          </div>
        </div>
      </div>
    `;
  }
  
  function getDirections(address) {
    // Open in Google Maps
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  }
  
  // Initialize the application
  function initApp() {
    const alertsContainer = document.getElementById('alerts-container');
    const locationText = document.getElementById('location-text');
    const mapStatus = document.getElementById('map-status');
  
    // Render initial alerts
    alertsContainer.innerHTML = mockAlerts.map(createAlertCard).join('');
  
    // Get user location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          
          locationText.textContent = 'Location access enabled';
          mapStatus.textContent = `Showing ${mockAlerts.length} active alerts and safe zones near you`;
        },
        (error) => {
          console.error('Error getting location:', error);
          locationText.textContent = 'Enable location for alerts';
        }
      );
    }
  }
  
  // Start the application when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initApp);