import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Help from '@/components/Help'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Profile from '@/components/ProfileComponents/Profile'
import ProfileCreate from '@/components/ProfileComponents/ProfileCreate'
import ProfileEdit from '@/components/ProfileComponents/ProfileEdit'
import ProfileUsers from '@/components/ProfileComponents/ProfileUsers'
import ProfileOther from '@/components/ProfileComponents/ProfileOther'
import ProfileImageUpload from '@/components/ProfileComponents/ProfileImageUpload'
import WebpageCreate from '@/components/WebpageComponents/WebpageCreate'
import WebpageCollection from '@/components/WebpageComponents/WebpageCollection'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/me/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/profile-create',
      name: 'ProfileCreate',
      component: ProfileCreate
    },
    {
      path: '/profile-edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/user-profiles',
      name: 'ProfileUsers',
      component: ProfileUsers
    },
    {
      path: '/others-profile/:id',
      name: 'ProfileOther',
      component: ProfileOther
    },
    {
      path: '/profile-image-upload',
      name: 'ProfileImageUpload',
      component: ProfileImageUpload
    }
    ,
    {
      path: '/create-webpage',
      name: 'WebpageCreate',
      component: WebpageCreate
    }
  ]
})
