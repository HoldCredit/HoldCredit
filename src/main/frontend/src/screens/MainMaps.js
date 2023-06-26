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
            <h3 className="tit_cont tit_br">찾아오시는길</h3>
            <div className="module_content">
                <div className="bxType01">
                    <div id="map" style={{ width: '100%' , height: '500px' , border: '1px solid #ccc' }}></div> {/* Map
                    container */}
                </div>
            </div>
                <h3 className="tit_cont tit_br">위치안내</h3>
            <div class="contact">
            <tr class="txtList01">
            <th>주소</th>
            <td>서울특별시 강남구 테헤란로 130 호산빌딩 5F, 6F (T: 1544-9970)</td>
            </tr>
            <tr>
            <th>버스</th>
            <td>역삼역.포스코P&S타워 정류장지선 146 / 740 / 341 / 360  간선 1100 / 1700 / 2000 / 7007 / 8001</td>
            </tr>
            <tr>
            <th>지하철</th>
            <td>지하철 2호선 역삼역 3번출구 100m</td>
            </tr>
            </div>
        </div>
    </div>
</div>
);
}

export default MainMaps;