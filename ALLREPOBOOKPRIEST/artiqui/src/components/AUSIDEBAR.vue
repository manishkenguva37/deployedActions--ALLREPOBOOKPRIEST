<template>
  <div>
    <!-- Overlay for mobile -->
    <div
      class="overlay"
      v-if="isOpen && isMobile"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <transition
      name="slide"
      @enter="logTransition('enter')"
      @leave="logTransition('leave')"
    >
      <aside
        v-if="isOpen || !isMobile"
        :class="['sidebar', { collapsed: !isMobile && !isOpen }]"
      >
        <div class="sidebar-header">
          <h2 v-if="isOpen">Menu</h2>

          <!-- Close button (mobile or expanded desktop) -->
          <button
            class="close-btn"
            v-if="isOpen"
            @click="toggleSidebar"
          >
            ×
          </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <a href="#" class="nav-item">
            <i class="bi bi-speedometer2"></i>
            <span v-if="isOpen">Dashb{{ isOpen }}oard</span>
          </a>
          <a href="#" class="nav-item">
            <i class="bi bi-person"></i>
            <span v-if="isOpen">Profile</span>
          </a>
          <a href="#" class="nav-item">
            <i class="bi bi-gear"></i>
            <span v-if="isOpen">Settings</span>
          </a>
          <a href="#" class="nav-item">
            <i class="bi bi-box-arrow-right"></i>
            <span v-if="isOpen">Logout</span>
          </a>
        </nav>
      </aside>
    </transition>

    <!-- Hamburger button -->
    <button
      class="menu-toggle"
      v-if="!isOpen || isMobile && !isOpen"
      @click="toggleSidebar"
    >
      <i class="bi bi-list"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isMobile: false
    };
  },
  mounted() {
    // Bind method to ensure correct `this` context
    this.checkScreen = this.checkScreen.bind(this);
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen(); // Initial check on mount
  },
  beforeDestroy() {
    // Cleanup resize event listener
    window.removeEventListener("resize", this.checkScreen);
  },
  methods: {
    toggleSidebar() {
      try {
        this.isOpen = !this.isOpen;
        console.log('Sidebar toggled, isOpen:', this.isOpen, 'isMobile:', this.isMobile);
      } catch (error) {
        console.error('Error in toggleSidebar:', error);
      }
    },
    checkScreen() {
      try {
        // Skip if window is undefined (e.g., SSR)
        if (typeof window === 'undefined') {
          console.log('checkScreen: window undefined, likely SSR');
          return;
        }
        this.isMobile = window.innerWidth < 768;
        this.isOpen = !this.isMobile; // Open on desktop, closed on mobile
        console.log('checkScreen:', { isMobile: this.isMobile, isOpen: this.isOpen });
      } catch (error) {
        console.error('Error in checkScreen:', error);
      }
    },
    logTransition(event) {
      console.log(`Transition event: ${event}`);
    }
  }
};
</script>

