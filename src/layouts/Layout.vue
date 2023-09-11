<template>
  <div class="main-layout" :class="mainLayoutClass">
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      :isMobile="isMobile"
      :mobileCollapsed="mobileCollapsed"
      :theme="selectedTheme"
      :show-one-child="true"
      :headerHeight="headerHeight"
      @item-click="onItemClick"
      ref="sidebar"
    />

    <div class="main-app-bar" ref="appbar">
      <div class="mobile-logo">
        <router-link to="/">
          <img :src="liraLogo" />
        </router-link>
      </div>
      <div class="toolbar">
        <v-app-bar-nav-icon class="collapser" @click.stop="onAppBarIconClick" />
        <div class="custom-menu">
          <div class="search-box">
            <input type="text" placeholder="Search..." />
            <v-icon>search</v-icon>
          </div>
          <v-menu bottom left
            :offset-y="true"
            nudge-bottom="8px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <img :src="bellIcon" />
              </v-btn>
            </template>

            <v-list v-if="notifications" class="layout-menu-content">
              <v-list-item
                v-for="(item, i) in notifications"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu bottom left
            :offset-y="true"
            nudge-bottom="8px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <img :src="infoIcon" />
              </v-btn>
            </template>

            <v-list class="layout-menu-content">
              <v-list-item>
                <v-list-item-content>
                  <router-link to='/'>
                    <i class="pro-box" />
                    <span> 1800-123-4567</span>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <router-link to='/'>
                    <i class="pro-box mail" />
                    <span> lira@xyz.com</span>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <router-link to='/'>
                    <i class="pro-box inbox" />
                    <span> Inbox</span>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <router-link to='/'>
                    <i class="pro-box chat" />
                    <span> Chat</span>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu bottom right
            :offset-y="true"
            nudge-bottom="8px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
              >
                <span class="name">{{loggedInUser.user_name}}</span><img :src="userIcon" />
              </v-btn>
            </template>

            <v-list class="layout-menu-content">
              <v-list-item>
                <v-list-item-content>Action</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Another action</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>Something else here</v-list-item-content>
              </v-list-item>
              <v-divider />
              <v-list-item>
                <v-list-item-content @click="logoutClick">Logout</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>

    <div class="main" @click="onMainClick">
      <router-view />
    </div>
    <v-dialog
      v-model="errorDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          primary-title
        >
          {{errorDialogTitle}}
        </v-card-title>

        <v-card-text>
          {{errorDialogContent}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="errorDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <app-footer />
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import axios from '../axios'
  import AppFooter from '../components/Footer'
  import SidebarMenu from '../components/SidebarMenu'

  import liraLogo from '../assets/images/lera-logo.png'
  import bellIcon from '../assets/images/ring.png'
  import infoIcon from '../assets/images/info.png'
  import userIcon from '../assets/images/user.png'
  import homeIcon from '../assets/images/home-sp.png'

  import menuIcons from './menu_images.json'

  export default {
    components: {
      AppFooter,
      SidebarMenu,
    },
    props: {
      source: String,
    },
    data: () => ({
      liraLogo,
      bellIcon,
      infoIcon,
      userIcon,
      homeIcon,
      user: {
        name: 'John Smith'
      },
      errorDialog: false,
      errorDialogContent: '',
      errorDialogTitle: '',
      loading: true,
      menu: [],
      notifications: [],
      headerHeight: 55,
      collapsed: false,
      isMobile: false,
      mobileCollapsed: true,
      toLogin: false,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'white-theme'
    }),
    computed: {
      ...mapGetters(['loggedInUser']),
      mainLayoutClass() {
        let classStr = '';
        if (this.isMobile) {
          classStr += 'is-mobile';
          if (this.mobileCollapsed) {
            classStr += ' collapsed';
          }
        }
        else {
          if (this.collapsed) {
            classStr += 'collapsed';
          }
        }
        return classStr;
      }
    },
    methods: {
      ...mapActions(['logout']),
      onItemClick (event, item) {
        window.console.log(`onItemClick ${event} ${item}`)
        if (!item.child && this.isMobile && !this.mobileCollapsed) {
          this.mobileCollapsed = true;
        }
      },
      onAppBarIconClick() {
        if (this.isMobile) {
          this.mobileCollapsed = !this.mobileCollapsed;
        }
        else {
          this.collapsed = !this.collapsed;
        }
      },
      onWindowResize() {
        if (this.isMobile && window.innerWidth >= 760) {
          this.isMobile = false;
          this.collapsed = false;
          this.mobileCollapsed = false;
        }
        else if (!this.isMobile && window.innerWidth < 760) {
          this.isMobile = true;
          this.collapsed = false;
          this.mobileCollapsed = true;
        }
      },
      getRealMenu(items) {
        return items.map(item => {
          const menu1 = {
            href: item.URL,
            icon: item.image,
            title: item.name,
            id: item.id,
            displaysequence: item.displaysequence,
            parent_id: item.parent_id,
            process_id: item.process_id,
          };
          if (!menu1.icon && !parseInt(menu1.parent_id)) {
            let menuIconFile = menuIcons[menu1.title];
            if (!menuIconFile) {
              menuIconFile = "view-1.png";
            }
            menu1.icon = require('../assets/images/' + menuIconFile);
          }
          if (item.submenu && item.submenu.length > 0) {
            menu1.child = this.getRealMenu(item.submenu);
          }
          return menu1;
        });
      },
      onMainClick() {
        if (this.isMobile && !this.mobileCollapsed) {
          this.mobileCollapsed = true;
        }
      },
      logoutClick() {
        this.logout();
        this.$router.push('/login');
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.onWindowResize);
        this.isMobile = window.innerWidth < 760;
        this.headerHeight = this.$refs.appbar.hieght;
        window.console.log(this.$refs.appbar.offset);
      });
      const homeMenu = [{
        href: '/',
        title: 'Home',
        icon: homeIcon,
      }];
      axios.post('webuser/sidemenu')
        .then(res => {
          const response = res.data.response;
          if (response.status) {
            const menus = this.getRealMenu(response.data);
            this.menu = [...homeMenu, ...menus];
          }
          else {
            this.menu = homeMenu;
            this.errorDialogTitle = 'Something went wrong';
            this.errorDialogContent = response.message;
            this.errorDialog = true;
            if (response.message.includes('Token')) {
              this.toLogin = true;
            }
          }
          this.loading = false;
        })
        .catch((e) => {
          this.menu = homeMenu;
          this.errorDialogTitle = 'Something went wrong';
          this.errorDialogContent = 'Please refresh the page.';
          this.errorDialog = true;
          window.console.log(e);
          this.loading = false;
        });
    },
    watch: {
      errorDialog() {
        if (!this.errorDialog && this.toLogin) {
          this.logout();
          this.$router.push('/login');
        }
      }
    }
  }
</script>

<style lang="scss">
.main-layout {
  flex: 1 1 auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  background-color: #fff;

  .main-app-bar {
    margin: 0 0 0 230px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1) transform,
                0.2s cubic-bezier(0.4, 0, 0.2, 1) background-color,
                0.2s cubic-bezier(0.4, 0, 0.2, 1) left,
                0.2s cubic-bezier(0.4, 0, 0.2, 1) right,
                280ms cubic-bezier(0.4, 0, 0.2, 1) box-shadow,
                0.25s cubic-bezier(0.4, 0, 0.2, 1) max-width,
                0.25s cubic-bezier(0.4, 0, 0.2, 1) margin,
                0.25s cubic-bezier(0.4, 0, 0.2, 1) width;

    position: relative;
    box-shadow: 0 12px 16px #bbbabd87;
    z-index: 1003;
    
    .mobile-logo {
      height: 50px;
      vertical-align: middle;
      text-align: center;
      display: none;
      img {
        max-width: 105px;
        max-height: 50px;
        padding: 4px;
        padding-top: 10px;
        object-fit: contain;
      }
    }

    .toolbar {
      background-color: #eeedf2;
      position: relative;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .collapser {
        background-color: transparent;
        box-shadow: none;
        color: #3c8dbc;
        padding: 15px 0 40px 20px;

        &:hover {
          background-color: transparent;
          color: white;
        }

        i.v-icon {
          font-size: 24px;
          font-weight: 500;
        }
      }

      .custom-menu {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin: 5px 15px;

        .search-box {
          position: relative;
          margin-right: 10px;

          @media screen and (max-width: 430px) {
            display: none;
          }
          input {
            width: 210px;
            border-color: #ccc;
            background-color: transparent;
            font-size: 14px;
            height: 26px;
            border-radius: 4px;
            padding: 6px 12px;
            border: 1px solid #ccc;
          }

          .v-icon {
            font-size: 18px;
            position: absolute;
            right: 5px;
            top: 5px;
            color: #acabafba;
          }
        }

        .v-btn {
          box-shadow: none;
          font-size: 14px;
          color: transparent;
          text-transform: capitalize;
          font-weight: 600;
          background-color: transparent;
          padding: 3px;

          span.name {
            color: #6da2f9;
            padding-right: 10px;

            @media screen and (max-width: 760px) {
              display: none;
            }
          }
        }
      }
    }
  }

  .main {
    width: 100%;
    display: flex;
    flex: 1 0 auto;
    max-width: 100%;
    padding-left: 230px;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.collapsed {
    .main {
      padding-left: 50px;
    }
    .main-app-bar {
      margin-left: 50px;
    }
  }

  &.is-mobile {
    .main-app-bar {
      margin-left: 0;
      z-index: 1002;

      .mobile-logo {
        display: block;
      }
    }

    .main {
      padding-left: 0px;
    }

    &.collapsed {
      .main {
        padding-left: 0px;
      }
    }
  }

  .footer {
    background-color: #eeedf2;
    z-index: 1001;
  }
}

.layout-menu-content {
  font-size: 14px;
  font-weight: 300;
  .v-list-item {
    min-height: 26px;

    .v-list-item__content {
      padding: 4px 0;
      a {
        text-decoration: none;
        color: #000;
      }

      i.pro-box {
        background: url('~@/assets/images/profile-sprite.png') 0px 0 no-repeat;
        width: 22px;
        height: 22px;
        vertical-align: middle;
        padding: 5px 12px 5px 10px;
        margin-right: 9px;

        &.mail {
          background-position-x: -21px;
        }

        &.inbox {
          background-position-x: -41px;
        }
        &.chat {
          background-position-x: -62px;
        }
      }
    }
  }

  .v-divider {
    margin: 5px 0;
  }
}
</style>