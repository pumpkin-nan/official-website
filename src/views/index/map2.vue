<template>
  <div>
    <div>
      <el-input v-model="latitude"></el-input>
      <input v-model="latitude" placeholder="Latitude" class="border-2" />
      <input v-model="longitude" placeholder="Longitude" class="border-2" />
      <input v-model="zoom" placeholder="Zoom Level" class="border-2" />
      <button
        @click="goToLocation"
        class="bg-blue-500 hover:bg-sky-700 rounded-md p-2"
      >
        查询
      </button>
      <br />
      <input v-model="address" placeholder="Address" class="border-2" />
      <button
        @click="geocodeAddress"
        class="bg-blue-500 hover:bg-sky-700 rounded-md p-2"
      >
        Geocode Address
      </button>
      <button
        @click="reset"
        class="bg-gray-500 ml-10 hover:bg-sky-700 rounded-md p-2"
      >
        Reset
      </button>
    </div>
    <div ref="map" class="map mt-3"></div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      map: null,
      marker: null,
      polygon: null,
      latitude: "",
      longitude: "",
      zoom: 15,
      address: "",
      center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(this.$refs.map, {
        center: this.center,
        zoom: this.zoom,
      });

      this.marker = new google.maps.Marker({
        map: this.map,
      });

      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ["polygon"],
        },
        polygonOptions: {
          editable: true,
          draggable: true,
        },
      });

      drawingManager.setMap(this.map);

      google.maps.event.addListener(
        drawingManager,
        "overlaycomplete",
        (event) => {
          if (event.type === "polygon") {
            if (this.polygon) {
              this.polygon.setMap(null);
            }
            this.polygon = event.overlay;
            this.getPolygonPoints();
          }
        }
      );
    },
    goToLocation() {
      const lat = parseFloat(this.latitude);
      const lng = parseFloat(this.longitude);
      const zoom = parseInt(this.zoom);

      if (!isNaN(lat) && !isNaN(lng)) {
        this.map.setCenter({ lat, lng });
        this.map.setZoom(zoom);
        this.marker.setPosition({ lat, lng });
      } else {
        alert("Please enter valid latitude and longitude");
      }
    },
    geocodeAddress() {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: this.address }, (results, status) => {
        if (status === "OK") {
          this.map.setCenter(results[0].geometry.location);
          this.map.setZoom(17);
          this.marker.setPosition(results[0].geometry.location);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    },
    getPolygonPoints() {
      const vertices = this.polygon.getPath();
      const points = [];
      vertices.forEach((vertex, i) => {
        points.push({
          lat: vertex.lat(),
          lng: vertex.lng(),
        });
      });
      console.log(points);
    },
    reset() {
      this.latitude = "";
      this.longitude = "";
      this.zoom = 15;
      this.address = "";
      this.map.setCenter(this.center);
      this.map.setZoom(this.zoom);
      if (this.marker) {
        this.marker.setPosition(null);
      }
      if (this.polygon) {
        this.polygon.setMap(null);
      }
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}
</style>
