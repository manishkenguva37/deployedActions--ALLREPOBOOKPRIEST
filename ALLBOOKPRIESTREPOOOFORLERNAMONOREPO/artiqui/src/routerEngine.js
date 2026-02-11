import AUBUTTON from "./components/AUBUTTON.vue";
import AUCARD from "./components/AUCARD.vue";
import AUCHECKBOX from "./components/AUCHECKBOX.vue";
import AUSTATSCARD from "./components/AUSTATSCARD.vue";
import AUPAGECARD from "./components/AUPAGECARD.vue";
import AUINPUT from "./components/AUINPUT.vue";
import AUWELCOMEBANNER from "./components/AUWELCOMEBANNER.vue";
import AUICONBUTTON from "./components/AUICONBUTTON.vue";
import AUHV from "./components/AUHV.vue";
import AUSTUSINDI  from "./components/AUSTUSINDI.vue";
import AUBaseButton from "./components/AUBaseButton.vue";
import AUBaseInput from "./components/AUBaseInput.vue";
import AUBaseTextarea from "./components/AUBaseTextarea.vue";
import AUBaseToggle from "./components/AUBaseToggle.vue"
import AUSIDEBAR from "./components/AUSIDEBAR.vue";
import AURADIO from "./components/AURADIO.vue";
import AUPAGINATION from "./components/AUPAGINATION.vue";
import AUSELECT from "./components/AUSELECT.vue";
import AUMULTISELECT from "./components/AUMULTISELECT.vue";
import AUTABLE from "./components/AUTABLE.vue";
import AUDATEPICKER from "./components/AUDATEPICKER.vue";
// import 'flatpickr/dist/flatpickr.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css'


export default {
    install(Vue) {
        Vue.component('AUBUTTON', AUBUTTON);
        Vue.component('AUCARD', AUCARD);
        Vue.component('AUCHECKBOX', AUCHECKBOX);
        Vue.component('AUSTATSCARD', AUSTATSCARD);
        Vue.component('AUPAGECARD',AUPAGECARD);
        Vue.component('AUINPUT',AUINPUT);
        Vue.component('AUWELCOMEBANNER', AUWELCOMEBANNER);
        Vue.component('AUHV', AUHV);
        Vue.component('AUICONBUTTON', AUICONBUTTON);
        Vue.component("AUSTUSINDI",AUSTUSINDI);
        Vue.component("AUBASEBUTTON",AUBaseButton);
        Vue.component("AUBASEINPUT",AUBaseInput);
        Vue.component("AUBASETEXTAREA",AUBaseTextarea);
        Vue.component("AUBASETOGGLE",AUBaseToggle);
        Vue.component("AUSIDEBAR",AUSIDEBAR);
        Vue.component("AURADIO",AURADIO);
        Vue.component("AUPAGINATION",AUPAGINATION);
        Vue.component("AUSELECT",AUSELECT);
        Vue.component("AUMULTISELECT",AUMULTISELECT);
        Vue.component("AUTABLE",AUTABLE);
        Vue.component("AUDATEPICKER",AUDATEPICKER);
        // Vue.prototype.$bus = new Vue(); // Global event bus
        // Vue.prototype.$eventHub = new Vue(); // Global event hub
        // Vue.prototype.$globalData = {
        //     user: null, 
        //     isAuthenticated: false,
        //     setUser(user) {
        //         this.user = user;
        //         this.isAuthenticated = !!user; // Set isAuthenticated based on user presence
        //     }
        // };
        // Vue.prototype.$setUser = function(user) {
        //     this.$globalData.setUser(user);
        // }
        // Vue.prototype.$getUser = function() {
        //     return this.$globalData.user;
        // }
    }
}