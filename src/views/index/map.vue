<template>
  <div>
    <div>
      <input
        type="text"
        v-model="latitude"
        placeholder="输入纬度"
        class="border-2"
      />
      <input
        type="text"
        v-model="longitude"
        placeholder="输入经度"
        class="border-2"
      />
      <input
        type="text"
        v-model="height"
        placeholder="输入高度"
        class="border-2"
      />
      <button @click="searchLocation">Search</button>
    </div>
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      latitude: "",
      longitude: "",
      height: "",
      map: null,
      marker: null,
      elevator: null,
    };
  },
  mounted() {
    if (typeof google === "undefined") {
      this.loadGoogleMapsScript();
    } else {
      this.initMap();
    }
  },
  methods: {
    loadGoogleMapsScript() {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCQjyrubWeEahCuA_tGIUGhIht_MngWBLs&libraries=places,drawing`;
      script.async = true;
      script.defer = true;
      script.onload = this.initMap;
      document.head.appendChild(script);
    },
    initMap() {
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 40.6891646, lng: -74.04459659999999 },
        zoom: 15,
      });

      this.elevator = new google.maps.ElevationService();

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ["marker", "polygon"],
        },
      });
      drawingManager.setMap(this.map);

      google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        (event) => {
          if (event.type === google.maps.drawing.OverlayType.POLYGON) {
            const polygon = event.overlay;
            const path = polygon.getPath();
            const points = [];

            for (let i = 0; i < path.getLength(); i++) {
              const point = path.getAt(i);
              points.push({ lat: point.lat(), lng: point.lng() });
            }

            console.log("Polygon points:", points);
          }
        }
      );
    },
    searchLocation() {
      if (this.latitude && this.longitude) {
        const latLng = new google.maps.LatLng(this.latitude, this.longitude);
        this.map.setCenter(latLng);
        // 精确到建筑物大小
        this.map.setZoom(20);

        if (this.marker) {
          this.marker.setMap(null);
        }

        this.marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
        });

        if (this.height) {
          this.getElevation(latLng);
        }
      }
    },
    getElevation(latLng) {
      this.elevator.getElevationForLocations(
        {
          locations: [latLng],
        },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              console.log(
                "Elevation at this point is " +
                  results[0].elevation +
                  " meters."
              );
              if (Math.abs(results[0].elevation - this.height) > 5) {
                alert(
                  "The specified height does not match the actual elevation."
                );
              }
            } else {
              console.log("No results found");
            }
          } else {
            console.log("Elevation service failed due to: " + status);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
.map {
  height: 80vh;
  width: 100%;
}
</style>
