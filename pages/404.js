import Head from 'next/head'
import Image from 'next/image'
import { FAQ } from '../components/FAQ'
import Index from '../components_new/home' 
import { Nav } from '../components_new/nav'
import styles from '../styles/Home.module.css'
// import { LandingPage } from "../components/LandingPage"


export default function _404() {
  return ( 
    <Index />
  )
}
