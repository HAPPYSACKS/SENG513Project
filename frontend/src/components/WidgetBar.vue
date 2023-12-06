<template>
  <div>
    <div
      v-show="isPopupShown"
      class="rectangle-container slide-in-top"
      id="popup"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div class="rectangle">
        <div @click="chooseType('self')" class="half for-myself">
          For Myself
        </div>
        <div @click="chooseType('room')" class="half for-room">For Room</div>
      </div>
      <!-- <div class="triangle"></div> -->
    </div>

    <div class="menu">
      <ClockWidget />
      <div class="widget">
        <div class="left">
          <div class="item">
            <i
              class="fa-solid fa-users fa-xl icon"
              @click="showPopup('Room-Member')"
              id="Room-Member"
            ></i>
          </div>
          <div class="item">
            <i
              class="fa-regular fa-comment-dots fa-xl icon"
              @click="showPopup('Chat')"
              id="Chat"
            ></i>
          </div>
          <div class="item">
            <i
              class="fa-solid fa-music fa-xl icon"
              @click="showPopup('Sound')"
              id="Sound"
            ></i>
          </div>
          <div
            v-show="!iconsActive"
            @click="toggleMoreWidgets"
            class="item"
            id="moreWidget"
            ref="moreWidgetIcon"
          >
            <div class="item">
              <i class="fa-regular fa-square-plus fa-xl icon"></i>
            </div>
          </div>
          <div
            class="groupedWidgets"
            :class="{ active: iconsActive }"
            ref="widgetIcons"
          >
            <div class="item">
              <i
                class="fa-brands fa-youtube fa-xl icon"
                @click="showPopup('Youtube')"
                id="Youtube"
              ></i>
            </div>
            <div class="item">
              <i
                class="fa-solid fa-stopwatch fa-xl icon"
                @click="showPopup('Timer')"
                id="Timer"
              ></i>
            </div>
            <div class="item">
              <i
                class="fa-solid fa-calendar-days fa-xl icon"
                @click="showPopup('Calendar')"
                id="Calendar"
              ></i>
            </div>
            <div class="item">
              <i
                class="fa-regular fa-note-sticky fa-xl icon"
                @click="showPopup('Sticky-Notes')"
                id="Sticky-Notes"
              ></i>
            </div>
          </div>
          <div class="right" v-if="isHost">
            <div class="divider"></div>
            <div class="item">
              <i class="fa-regular fa-image fa-xl icon"></i>
            </div>
            <div class="item">
              <i
                class="fa-solid fa-envelope fa-xl icon"
                @click="showPopup('Invite')"
                id="Invite"
              ></i>
            </div>
            <div class="item">
              <i class="fa-solid fa-gear fa-xl icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="divider"></div>
        <div class="item">
          <img
            @click="showPopup('ChangeBG')"
            src="@/assets/icons/changeBackground.png"
            alt="Change Background"
          />
        </div>
        <div class="item">
          <img src="@/assets/icons/settings.png" alt="Settings" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClockWidget from "./ClockWidget.vue";

export default {
  data() {
    return {
      iconsActive: false,
      isGroup: false,
      isPopupShown: false,
      widgetName: "",
      top: 0,
      left: 0,
      noPopup: ["Sound", "Invite", "Youtube", "ChangeBG"],
    };
  },
  props: {
    isHost: Boolean,
  },
  components: { ClockWidget },
  emits: ["returnPopupInfo", "showNoPopupWidget"],
  methods: {
    chooseType(type) {
      if (type === "room") {
        this.isGroup = true;
      } else {
        this.isGroup = false;
      }
      this.$emit("returnPopupInfo", this.isGroup, this.widgetName);
      this.isPopupShown = !this.isPopupShown;
    },

    showPopup(widgetName) {
      this.widgetName = widgetName;
      if (this.noPopup.includes(this.widgetName)) {
        this.$emit("showNoPopupWidget", this.widgetName);
      } else {
        this.isPopupShown = !this.isPopupShown;

        // Wait for the next DOM update before calling calc so offset is correct
        this.$nextTick(() => {
          this.calc();
        });
      }
    },

    calc() {
      const popup = document.getElementById("popup");
      const icon = document
        .getElementById(this.widgetName)
        .getBoundingClientRect();
      this.top = icon.top - popup.offsetHeight - 10;
      this.left = icon.left + icon.width / 2 - popup.offsetWidth / 2;
    },

    toggleMoreWidgets() {
      this.iconsActive = !this.iconsActive;
      this.$nextTick(() => {
        document.addEventListener("click", this.collapseIconsOnClickOutside);
      });
    },

    // POTENTIAL BUG
    collapseIconsOnClickOutside(event) {
      if (
        !this.$refs.moreWidgetIcon.contains(event.target) &&
        this.iconsActive &&
        !this.$refs.widgetIcons.contains(event.target)
      ) {
        this.iconsActive = !this.iconsActive;
      }
    },
  },
};
</script>

<style scoped>
.rectangle-container {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  /* display: none; */
  position: absolute;
  width: 250px;
  height: 50px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1000; /* Ensure it's on top of other elements */
}

.rectangle {
  width: 100%;
  height: 100%;
  background-color: #ececec;
  transition: background-color 0.3s;
  display: flex;
}

.half {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.for-myself:hover,
.for-room:hover {
  background-color: #000;
  color: #ececec;
}

.slide-in-top {
  animation: slide-in-top 0.3s ease;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.menu {
  position: absolute;
  bottom: 22px;
  width: 60%;
  transition: width 0.5s ease;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ececec;
  border: 1px solid #000;
  height: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
}

.widget {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

#moreWidget {
  display: inherit;
}

.groupedWidgets {
  display: flex;
  overflow: hidden;
  transition: max-width 0.5s ease; /* Add a smooth transition effect */
  max-width: 0; /* Initially hide the icons */
  gap: 10px;
}

.groupedWidgets.active {
  max-width: 300px; /* Set the maximum width to show the icons */
}

.groupedWidgets.active .item {
  display: block;
}

.divider {
  width: 1px;
  height: 30px;
  background-color: black;
}

.icon {
  margin-top: 15px;
}

.item {
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.item:hover {
  background-color: grey;
  border-radius: 5px;
}

@media screen and (max-width: 1100px) {
  .menu {
    width: 90%;
    transition: width 0.5s ease;
  }
}
</style>
