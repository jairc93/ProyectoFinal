<template>
    <div>
      <menu>
          <h1>LOGO</h1>
  
          <li>HOME</li>
          <li>ABOUT</li>
          <li>BUY</li>
          <li>SERVICES</li>
      </menu>
    </div>
  </template>
  
  <script>
  export default {
      name: 'MainMenu',
  }
  </script>
  
  <style scoped>
  menu{
      display: flex;
      justify-content: space-between;
      height: 80px;
      width: 100%;
      background-color: green;
      color: #FFF;
  }
  </style>