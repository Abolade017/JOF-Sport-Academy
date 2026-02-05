import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '../src/assets/main.css'
import '../src/assets/app.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { faWhatsapp, faFacebook, faInstagram, faGithub, faTiktok, faYoutube, faXTwitter, faLinkedin, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
library.add(faWhatsapp, faFacebook, faFacebookF, faInstagram, faGithub, faTiktok, faYoutube, faXTwitter, faLinkedin, faTwitter)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
