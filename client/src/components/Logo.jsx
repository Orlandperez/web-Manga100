import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/"><img src={logo} alt ="logo"/></Link>
    </div>
  );
}