import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { color } from '@mui/system'
import '../constants/Navbar.css';
import '../constants/Footer.css';
import '../constants/text.css';
import Navbar from './Navbar'

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer>{`Copyright © CS308 Team 9 ${year}`}</footer>;
};

function Text() {
  return (
    <div class="containerText">
      <div class="contentText">
        <h1Welcome>Welcome to SUnroof!</h1Welcome>
      </div>
    </div>
  );

};

export default function PlaceholderPage() {

  return (

    <div className="containerNavbar">
      <div className="content">

        <Navbar />
        <Text />

      </div>
      <Footer />

    </div>

  )
}
