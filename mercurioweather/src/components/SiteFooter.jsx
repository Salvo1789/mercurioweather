import React, { Container, Col, Row } from 'react';
import './styles.css'

const SiteFooter = () => {
    
    const year = new Date().getFullYear();

  return <footer>{`Copyright © Mercurio Weather ${year}`}</footer>;

}

export default SiteFooter