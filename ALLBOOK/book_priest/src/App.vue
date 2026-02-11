<template>
  <div>
    <AUButton
      label="Download"
      :icon="DownloadIcon"
      iconPosition="left"
      variant="primary"
    />

    <!-- Button with right icon -->
    <AUButton
      label="Next"
      :icon="ArrowRightIcon"
      iconPosition="right"
      variant="outline"
    />
    <!-- <AUBUTTON></AUBUTTON> -->
    <!-- <AUCARD>
    <template v-slot:content>
      <p>Card content goes here     hbbbbbbbbbbbbbbbbbbbb   bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbnnnnnndddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
    </template>
  </AUCARD> -->
    <AUCHECKBOX>
      <template v-slot:content>
        <p>Checkbox content goes here</p>
      </template>
    </AUCHECKBOX>

    <AUSTATSCARD icon="truck" label="Active Delievers" value="25"></AUSTATSCARD>
    <AUSTATSCARD icon="box"></AUSTATSCARD>
    <div class="app">hhhhh</div>
    <AUPAGECARD
      pagetitle="delivery"
      pageIcon="truck"
      pagedesc="the truck page"
    ></AUPAGECARD>
    <AUINPUT icon="bi-truck" label="The kenguva" iholder="hhhhh"></AUINPUT>
    <AUWELCOMEBANNER
      :userDetails="userDetails"
      :bannerTitle="bannerTitle"
    ></AUWELCOMEBANNER>
    <!-- <AUHV :Tabs="Tabs" :activeTab="activeTab" :tabledata="tabledata" @update:activeTa="updateActiveTab" >

    <template v-slot:"[Your Delivery Requests - Domestic"="slotProps">
          <h1>Hello, {{ slotProps.nam }}! Content slot is being used!</h1>
        </template>
 </AUHV> -->
    <AUHV
      :Tabs="Tabs"
      :activeTab="activeTab"
      :tabledata="tabledata"
      @update:activeTab="updateActiveTab"
    >
      <template v-slot:domestic="slotProps">
        <div>
          <h1>Hello! Here's the Domestic Deliveries:</h1>
          {{ slotProps }}
        </div>
      </template>

      <template v-slot:International="slotProps">
        <div>
          {{ slotProps }}
        </div>
      </template>
    </AUHV>
    <AUICONBUTTON
      icon="bi bi-box-seam"
      label="Click Me"
      type="numeric"
    ></AUICONBUTTON>
    <AUSTUSINDI
      CLABEl="VEfication for the Post"
      :verificationLabels="verificationLabels"
    >
    </AUSTUSINDI>

    <AUBASEBUTTON @click="saveSettings" :loading="isSaving">
      Save Changes
    </AUBASEBUTTON>

    <AUBASEINPUT v-model="user.name" placeholder="Enter your name" />

    <AUBASETEXTAREA
      v-model="user.bio"
      placeholder="Write your bio..."
      :rows="5"
    />

    <AUBASETOGGLE :value="darkMode" @change="darkMode = $event" />
    <!-- <AUSIDEBAR /> -->
    <AURADIO
      v-model="selectedOption"
      :options="[
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'mail', label: 'Mail' },
      ]"
      variant="primary"
      size="medium"
      @change="onRadioChange"
    />

    <AUPAGINATION
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :total-items="100"
      :page-sizes="[10, 25, 50]"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    />
    <AUSELECT
      v-model="selectedOption"
      :options="[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]"
      placeholder="Choose an option"
      variant="primary"
      @change="onSelectChange"
    />

    <AUMULTISELECT
      v-model="selectedOptions"
      :options="[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]"
      placeholder="Choose options"
      @change="onMultiSelectChange"
    />

    <AUTABLE
      :data="[
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Jane', age: 25 },
      ]"
      :columns="[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'age', label: 'Age', sortable: true },
      ]"
      selectable
      :page-size="10"
      :page-sizes="[10, 25, 50]"
      @row-select="onRowSelect"
      @sort="onSort"
    />

    <!-- <AUDATEPICKER
  v-model="selectedDate"
  variant="primary"
  min-date="2025-01-01"
  max-date="2025-12-31"
  @change="onDateChange"
/> -->

    <div class="container my-5">
      <!-- Single date, no past dates -->
      <AUDATEPICKER
        v-model="singleDate"
        mode="single"
        placeholder="Select a date"
        variant="primary"
        restrict-past-dates
        :min-date="'2025-08-01'"
        :max-date="'2025-12-31'"
        :disabled-dates="['2025-08-15', '2025-12-25']"
        @change="onDateChange"
      />
      <!-- Range selection, custom past date restriction -->
      <AUDATEPICKER
        v-model="dateRange"
        mode="range"
        placeholder="Select date range"
        variant="secondary"
        restrict-past-dates="'2025-07-01'"
        :min-date="'2025-07-01'"
        :max-date="'2025-12-31'"
        show-shortcuts
        @change="onDateChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      // Define any data properties here if needed
      userDetails: {
        username: "John Doe",
        userVerified: true,
      },
      singleDate: null,
      dateRange: [],
      selectedDate: null,
      selectedOptions: [],
      selectedOption: null,
      currentPage: 1,
      pageSize: 10,
      isSaving: false,
      darkMode: false,
      user: {
        name: "",
        bio: "",
      },
      bannerTitle: {
        title: "Welcome App",
        subtitle: "This is a subtitle for the welcome banner",
      },
      selectedOption: null,
      Tabs: [
        {
          name: "parcels",
          label: "Your Parcels",
          icon: "bi bi-box-seam",
          id: "deliveries-tab",
        },
        {
          name: "trips",
          label: "Your Trips",
          icon: "bi bi-truck",
          id: "trips-tab",
        },
        {
          name: "confirmed",
          label: "Confirmed Deliveries",
          icon: "bi bi-patch-check",
          id: "delivery-parcels",
        },
        {
          name: "messages",
          label: "Messages",
          icon: "bi bi-chat-dots",
          id: "messages-tab",
        },
      ],
      activeTab: "parcels",
      tabledata: [
        {
          title: "domestic",
          deliveries: [
            {
              product_id: "P001",
              item_type: "Laptop",
              pickup_address: "Hyderabad",
              dropoff_address: "Bangalore",
              pickup_date: "2025-08-10",
              budget: 1500,
            },
            {
              product_id: "P002",
              item_type: "Documents",
              pickup_address: "Delhi",
              dropoff_address: "Mumbai",
              pickup_date: "2025-08-11",
              budget: 500,
            },
          ],
        },
        {
          title: "International",
          deliveries: [
            {
              product_id: "P003",
              item_type: "Mobile Phone",
              pickup_address: "Chennai",
              dropoff_address: "Singapore",
              pickup_date: "2025-08-15",
              budget: 5000,
            },
          ],
        },
      ],
      triptabledata: [
        {
          title: "domestic",
          deliveries: [
            {
              product_id: "P999901",
              item_type: "Laptop",
              pickup_address: "Hyderabad",
              dropoff_address: "Bangalore",
              pickup_date: "2025-08-10",
              budget: 1500,
            },
            {
              product_id: "P002",
              item_type: "Documents",
              pickup_address: "Delhi",
              dropoff_address: "Mumbai",
              pickup_date: "2025-08-11",
              budget: 500,
            },
          ],
        },
        {
          title: "International",
          deliveries: [
            {
              product_id: "P003",
              item_type: "Mobile Phone",
              pickup_address: "Chennai",
              dropoff_address: "Singapore",
              pickup_date: "2025-08-15",
              budget: 5000,
            },
          ],
        },
      ],
      verificationLabels: [
        { label: "Email", isVerified: true },
        { label: "Phone Number", isVerified: false },
      ],
      onRowSelect(id) {
        console.log("Row selected:", id);
      },
      onSort({ key, order }) {
        console.log("Sorted by:", key, order);
      },
    };
  },
  methods: {
    onMultiSelectChange(values) {
      console.log("Selected:", values);
    },
    onSelectChange(value) {
      console.log("Selected:", value);
    },
    onPageChange(page) {
      console.log("Page changed:", page);
    },
    onDateChange(value) {
      console.log("Date selected:", value);
    },
    onPageSizeChange(size) {
      console.log("Page size changed:", size);
    },
    saveSettings() {
      this.isSaving = true;
      setTimeout(() => {
        console.log("Saved!", this.user, this.darkMode);
        this.isSaving = false;
      }, 1000);
    },
    onRadioChange(value) {
      console.log("Selected:", value);
    },
    handleClick() {
      // Handle button click event
      alert("Button clicked!");
    },
    updateActiveTab(tabName) {
      this.activeTab = tabName;
      console.log("Active tab updated to:", this.activeTab);
      setTimeout(() => {
        this.tabledata = this.triptabledata;
      }, 3000);
      // this.tabledata = this.triptabledata; // Update tabledata based on active tab
    },
  },
};
</script>

<style>
/* // @import "~artiqui/assets/sass/main.scss"; 
// .app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: $primary-base;
//   margin-top: 60px;
// } */
</style>
