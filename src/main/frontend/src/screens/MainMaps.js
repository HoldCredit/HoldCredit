import React, { useEffect } from 'react';
import './css/Service.css';

const MainMaps = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true; // Load the script asynchronously
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=829c61046bd0b6193cce315fea954fa1&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API is ready
      if (window.kakao && window.kakao.maps) {
        const { kakao } = window;
        const container = document.getElementById('map'); // Get the map container element

        const options = {
          center: new kakao.maps.LatLng(37.4992, 127.0328), // Set the center coordinates of the map
          level: 1,
        };

        const map = new kakao.maps.Map(container, options);
        // Customize the map settings and add markers, overlays, etc. as needed

        // Example: Add a marker to the map
        const markerPosition = new kakao.maps.LatLng(37.4992, 127.0328);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        // ...
      }
    };

    return () => {
      // Clean up: remove the script element
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div className="kakaoContent" role="main">
        <div id="mArticle">
          <div className="bg_main"></div>
          <div>
            <h3 className="tit_cont tit_br">찾아오시는길</h3>
            <div className="module_content">
                    <div className="bxType01">
                      <div id="map" style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}></div> {/* Map container */}
                    </div>
            </div>
                  <h3 class="title1 mt-lg">위치안내</h3>
              </div>
          </div>
      </div>
    </div>
  );
}

export default MainMaps;
